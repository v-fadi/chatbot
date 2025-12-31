import React, { useState } from "react";
import { Text, Button, TextInput, View } from "react-native";
import { SettingsProps } from "../../Domain/Chat";
import { settingsStyles as styles } from "./styles/SettingsScreen.styles";

export function SettingsScreen({ setPersonality }: SettingsProps) {
  const [draft, setDraft] = useState<string>("");

  const handleSave = () => {
    const val = draft.trim();
    if (val) setPersonality(val);
  };

  const handleReset = () => {
    setPersonality("Default personality");
    setDraft("");
  };

  return (
    <View style={styles.centerScreen}>
      <Text style={{ fontSize: 24 }}>⚙️ Settings</Text>
      <Text style={{ marginVertical: 10 }}>Choose chatbot personality:</Text>
      <TextInput
        value={draft}
        placeholder="Enter personality description"
        onChangeText={setDraft}
        style={{ width: '100%', padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 6 }}
      />
      <View style={{ flexDirection: 'row', marginTop: 12, gap: 8 }}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Reset to Default" onPress={handleReset} />
      </View>
    </View>
  );
}