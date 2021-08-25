import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import Main from './screens/Main';
import Detail from './screens/Detail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={Main} />
        <Stack.Screen name='Detail' component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
