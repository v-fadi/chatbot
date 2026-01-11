import 'react-native-gesture-handler';
import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  Linking
} from 'react-native';
// Add EncodingType to your imports


// Make sure you install this: npx expo install expo-file-system
import * as FileSystem from 'expo-file-system';

import * as ImagePicker from 'expo-image-picker';


import * as DocumentPicker from 'expo-document-picker';

import { ChatMessage, ChatProps } from '../../Domain/Chat';
import { GeminiAIService } from '../../Infrastructure/GeminiAIService';
import { getGreeting } from '../../Application/usecases/getGreeting';
import { getChatErrorMessage } from '../../Application/usecases/getChatErrorMessage';
import { sendMessageUseCase } from '../../Application/usecases/sendMessage';
import { getNetworkErrorMessage } from '../../Application/usecases/getNetworkErrorMessage';
import { chatStyles as styles } from './styles/ChatScreen.styles';

export function ChatScreen({ personality }: ChatProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [networkErrorResponse, setNetworkErrorResponse] = useState<string | null>(null);
  const [chatErrorResponse, setChatErrorResponse] = useState<string | null>(null);
  const [attachMenuVisible, setAttachMenuVisible] = useState(false);

  const flatListRef = useRef<FlatList<ChatMessage> | null>(null);
  const ai = useRef(new GeminiAIService()).current;

  useEffect(() => {
    const run = async () => {
      const greeting = await getGreeting(ai, personality);
      setChatHistory([{ id: Date.now().toString(), text: greeting, sender: 'system' }]);
    };
    run();
  }, [personality]);

  useEffect(() => {
    const run = async () => {
      const msg = await getNetworkErrorMessage(ai, personality);
      setNetworkErrorResponse(msg);
    };
    run();
  }, [personality]);

  useEffect(() => {
    const run = async () => {
      const msg = await getChatErrorMessage(ai, personality);
      setChatErrorResponse(msg);
    };
    run();
  }, [personality]);


    // --- Attachment Logic ---
  const pickImage = async () => {
    try {
      console.log("Requesting media library permissions...");
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log("Permission result:", permission);
      
      if (!permission.granted) {
        alert("Photo library access required. Please enable in settings.");
        console.warn("Photo permission denied:", permission);
        return;
      }

      console.log("Launching image library...");
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5, 
      });

      console.log("Image picker result:", result);
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAttachMenuVisible(false);
        const asset = result.assets[0];
        
        try {
          // Convert image to Base64
          const base64 = await FileSystem.readAsStringAsync(asset.uri, {
              encoding: 'base64',
          });

          const imgMsg: ChatMessage = {
              id: Date.now().toString(),
              text: `Image: ${asset.uri}`,
              sender: "user",
              image_data: {
                  base64: base64,
                  mimeType: asset.mimeType ?? 'image/jpeg'
              }
          };

          setChatHistory(prev => [...prev, imgMsg]);
          
          await handleSendMessage(imgMsg);

        } catch (e) {
          console.error("Error processing image:", e);
          alert("Failed to process image");
        }
      } else {
        setAttachMenuVisible(false);
      }
    } catch (e) {
      console.error("Error in pickImage:", e);
      setAttachMenuVisible(false);
      alert("Failed to open photo library");
    }
  };

  const pickDocument = async () => {
    try {
      console.log("Launching document picker...");
      const result = await DocumentPicker.getDocumentAsync({});
      console.log("Document picker result:", result);
      
      const resAny = result as any;
      if (resAny && resAny.type === 'success') {
        setAttachMenuVisible(false);
        const name = resAny.name as string | undefined;
        const uri = resAny.uri as string | undefined;
        const docMsg: ChatMessage = {
          id: Date.now().toString(),
          text: `Document: ${name ?? 'file'} ${uri ?? ''}`,
          sender: 'user',
        };
        setChatHistory((prev) => [...prev, docMsg]);

        await handleSendMessage(docMsg);
      } else {
        setAttachMenuVisible(false);
      }
    } catch (e) {
      console.error("Error in pickDocument:", e);
      setAttachMenuVisible(false);
    }
  };

  // --- Sending Logic ---

  const handleSendMessage = async (customMessage?: ChatMessage) => {
    const textInput = message.trim();
    
    const messageToSend = customMessage || (textInput ? { 
        id: Date.now().toString(), 
        text: textInput, 
        sender: 'user' 
    } as ChatMessage : undefined);

    if (!messageToSend) return;

    if (!customMessage) {
        setChatHistory(prev => [...prev, messageToSend]);
        setMessage('');
    }

    setIsTyping(true);

    try {
        const responseText = await ai.ask(
            messageToSend.text, 
            personality, 
            messageToSend.image_data // This is undefined for normal text messages
        );

        const systemMsg: ChatMessage = {
            id: Date.now().toString(),
            text: responseText,
            sender: 'system'
        };
        setChatHistory(prev => [...prev, systemMsg]);

    } catch (error) {
        console.error("Send error:", error);
        setChatHistory(prev => [...prev, {
            id: Date.now().toString(),
            text: chatErrorResponse || "I'm having trouble connecting right now.",
            sender: 'system'
        }]);
    } finally {
        setIsTyping(false);
    }
  };

  // --- Rendering ---

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.systemBubble]}>
      {typeof item.text === 'string' && item.text.startsWith('Image: ') ? (
        <View>
            <Image 
                source={{ uri: item.text.replace('Image: ', '') }} 
                style={styles.chatImage} 
                resizeMode="cover" 
            />
        </View>
      ) : typeof item.text === 'string' && item.text.startsWith('Document: ') ? (
        <Pressable onPress={() => {
            const match = item.text.match(/(https?:\/\/\S+|file:\/\/\S+|content:\/\/\S+)/);
            if(match) Linking.openURL(match[0]);
        }}>
          <Text style={styles.documentLinkText}>📄 {item.text.replace('Document: ', '').split('file:')[0]}</Text>
        </Pressable>
      ) : (
        <Text style={[styles.messageText, item.sender === 'user' ? styles.userText : styles.systemText]}>
          {item.text}
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={chatHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        
        <Modal visible={attachMenuVisible} transparent animationType="slide">
          <View style={styles.modalOverlay} pointerEvents="box-none">
            <View style={styles.modalContent}>
              <Pressable onPress={pickImage} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Attach Photo</Text>
              </Pressable>
              <Pressable onPress={pickDocument} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Attach Document</Text>
              </Pressable>
              <Pressable onPress={() => setAttachMenuVisible(false)} style={styles.modalCancel}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {isTyping && <Text style={{ marginLeft: 20, marginBottom: 5, color: '#666' }}>Thinking...</Text>}
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="I'm listening..."
            placeholderTextColor="#888"
            onSubmitEditing={() => handleSendMessage()}
          />
          <TouchableOpacity onPress={() => setAttachMenuVisible(true)} style={styles.attachButton}>
            <Text style={styles.attachButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSendMessage()} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}