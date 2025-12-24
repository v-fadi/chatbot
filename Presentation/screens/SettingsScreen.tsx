import { Text, Button, TextInput, View } from "react-native";
import { SettingsProps } from "../../Domain/Chat";
import { settingsStyles as styles } from "./styles/SettingsScreen.styles";

export function SettingsScreen({ setPersonality }: SettingsProps) {
  return (
    <View style={styles.centerScreen}>
      <Text style={{ fontSize: 24 }}>⚙️ Settings</Text>
      <Text style={{ marginVertical: 10 }}>Choose chatbot personality:</Text>
      <TextInput
        placeholder="Enter personality description"
        onChangeText={(text) => setPersonality(text)}
      />
      <Button title="Reset to Default" onPress={() => setPersonality("Default personality")} />
    </View>
  );
}