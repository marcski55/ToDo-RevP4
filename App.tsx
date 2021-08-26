import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from './screens/Main';
import Detail from './screens/Detail';
import { Provider } from 'react-redux';
import { Store } from './redux/store/store';
import { mainTheme } from './screens/styles';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer theme={mainTheme}>
        <Stack.Navigator>
          <Stack.Screen name='Main' component={Main} />
          <Stack.Screen name='Detail' component={Detail} />
        </Stack.Navigator>
        <StatusBar style='light' />
      </NavigationContainer>
    </Provider>
  );
}
