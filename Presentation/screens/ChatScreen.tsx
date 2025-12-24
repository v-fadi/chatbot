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

} from 'react-native';

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

  const flatListRef = useRef<FlatList<ChatMessage> | null>(null);

  const ai = new GeminiAIService();

  useEffect(() => {
    const run = async () => {
      const greeting = await getGreeting(ai, personality);
      setChatHistory([{ id: Date.now().toString(), text: greeting, sender: 'system' }]);
    };
    run();
  }, []);


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


  const sendMessage = async () => {
    const systemMessage = await sendMessageUseCase(ai, message, personality);
    setChatHistory((prev) => [...prev, systemMessage]);
  };

  const renderItem = ({ item } : { item: ChatMessage }) => (
    <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.systemBubble]}>
      <Text style={[styles.messageText, item.sender === 'user' ? styles.userText : styles.systemText]}>
        {item.text}
      </Text>
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
        {isTyping && <Text style={{ marginLeft: 20, marginBottom: 5, color: '#666' }}>Thinking...</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="I'm listening..."
            placeholderTextColor="#888"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}