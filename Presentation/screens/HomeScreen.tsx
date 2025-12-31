import { View, Text } from 'react-native';
import { homeStyles as styles } from './styles/HomeScreen.styles';

export function HomeScreen() {
  return (
    <View style={styles.centerScreen}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Main Menu</Text>
      <Text style={{ marginTop: 10 }}>Select "Chat" to access the chatbot</Text>
    </View>
  );
}

