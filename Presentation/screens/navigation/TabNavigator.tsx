import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChatScreen } from "../ChatScreen.js";
import { SettingsScreen } from "../SettingsScreen.js";
import { HomeScreen } from "../HomeScreen.js";
import { ChatProps, SettingsProps } from "../../../Domain/Chat.js";


const Tab = createBottomTabNavigator();

type TabNavigatorProps = ChatProps & SettingsProps

export function TabNavigator({personality, setPersonality}: TabNavigatorProps) {
    return (
        <Tab.Navigator>
            <Tab.Screen name = "Home" component={HomeScreen} />
            <Tab.Screen name = "Chat">
                {() => <ChatScreen personality={personality} />}
            </Tab.Screen>
            <Tab.Screen name = "Settings">
                {() => <SettingsScreen setPersonality={setPersonality} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}