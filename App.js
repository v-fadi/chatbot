import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// --- 1. DUMMY SCREENS ---
function HomeScreen() {
  return (
    <View style={styles.centerScreen}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Main Menu</Text>
      <Text style={{ marginTop: 10 }}>Select "Chat" to access the chatbot</Text>
    </View>
  );
}

function SettingsScreen({ setPersonality }) {
  return (
    <View style={styles.centerScreen}>
      <Text style={{ fontSize: 24 }}>⚙️ Settings</Text>
      <Text style={{ marginVertical: 10 }}>Choose chatbot personality:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          paddingHorizontal: 10,
          marginBottom: 20,
          backgroundColor: '#fff',
        }}
        placeholder="Enter personality description"
        onChangeText={(text) => setPersonality(text)}
      />
      <Button title="Reset to Default" onPress={() => setPersonality("You are a friendly guide who helps travelers")} />
    </View>
  );
}

// --- 2. CHAT SCREEN ---
function ChatScreen({ personality }) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { id: '1', text: 'Hello! How can I help?', sender: 'system' },
  ]);

  const flatListRef = useRef(null);

  const fetchAIResponse = async (userQuery) => {
    setIsTyping(true);
    try {
      const apiKey = 'AIzaSyAPilB4_HAdOtzkc9Q2Fl3zeHDYjsQOnXg';
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: personality }] }, // personality injected here
            contents: [{ parts: [{ text: userQuery }] }],
          }),
        }
      );
      const data = await response.json();
      if (data.error) return `System Error: ${data.error.message}`;
      if (data.candidates && data.candidates.length > 0) return data.candidates[0].content.parts[0].text;
      return "I did not catch that, ser.";
    } catch (error) {
      return "The ravens could not carry your message (Network Error).";
    } finally {
      setIsTyping(false);
    }
  };

  const sendMessage = async () => {
    if (message.trim().length > 0) {
      const userMessage = message;
      setChatHistory((prev) => [...prev, { id: Date.now().toString(), text: userMessage, sender: 'user' }]);
      setMessage('');
      const responseText = await fetchAIResponse(userMessage);
      setChatHistory((prev) => [...prev, { id: (Date.now() + 1).toString(), text: responseText, sender: 'system' }]);
    }
  };

  const renderItem = ({ item }) => (
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

// --- 3. MAIN APP NAVIGATION ---
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Chat">
          {() => <ChatScreen personality={personality} />}
        </Tab.Screen>
        <Tab.Screen name="Settings">
          {() => <SettingsScreen setPersonality={setPersonality} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// --- 4. STYLES ---
const styles = StyleSheet.create({
  centerScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' },
  container: { flex: 1, backgroundColor: '#abedffff' },
  keyboardView: { flex: 1 },
  listContent: { padding: 15, flexGrow: 1, justifyContent: 'flex-end' },
  messageBubble: { padding: 12, borderRadius: 15, marginBottom: 10, maxWidth: '80%' },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#007AFF' },
  systemBubble: { alignSelf: 'flex-start', backgroundColor: '#fff' },
  messageText: { fontSize: 16 },
  userText: { color: '#fff' },
  systemText: { color: '#000' },
  inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  input: { flex: 1, height: 40, backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 15, marginRight: 10, color: '#000' },
  sendButton: { paddingVertical: 8, paddingHorizontal: 12 },
  sendButtonText: { color: '#3dc5ffff', fontWeight: 'bold', fontSize: 16 },
});