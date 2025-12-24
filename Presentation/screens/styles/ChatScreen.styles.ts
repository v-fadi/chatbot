import { StyleSheet } from 'react-native';

export const chatStyles = StyleSheet.create({
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
  sendButtonText: { color: '#3dc5ffff', fontWeight: 'bold', fontSize: 16 }
});