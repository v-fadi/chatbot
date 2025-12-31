import 'react-native-gesture-handler';
import { useState, useRef, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabNavigator } from './Presentation/screens/navigation/TabNavigator';

const Tab = createBottomTabNavigator();

export default function App() {
  const [personality, setPersonality] = useState<string>("Default personality");
  return (
    <NavigationContainer>
      <TabNavigator
        personality={personality} 
        setPersonality={setPersonality}/>
    </NavigationContainer>
  );
}
