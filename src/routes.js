import * as React from 'react';
import { NavigationContainer, createAppContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home/Index';
import Color from './pages/Color/Index';
import Splash from './pages/Splash/Index'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Color" component={Color} options={{ headerShown: false }} />
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;