import { StyleSheet } from 'react-native';

export const chatStyles: any = StyleSheet.create({
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
  ,attachButton: { paddingHorizontal: 12, paddingVertical: 8, marginRight: 8, backgroundColor: '#eee', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  attachButtonText: { fontSize: 20, color: '#333', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  modalButton: { paddingVertical: 12 },
  modalButtonText: { fontSize: 16, color: '#007AFF' },
  modalCancel: { marginTop: 8, paddingVertical: 12 },
  modalCancelText: { fontSize: 16, color: '#ff3b30', textAlign: 'center' },
  chatImage: { width: 200, height: 120, borderRadius: 8, marginTop: 6 },
});