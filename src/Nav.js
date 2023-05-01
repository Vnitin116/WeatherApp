import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './home';
import Details from './Details';
import Splash from './Splash';
const stack = createNativeStackNavigator();
const Nav = () => {
  return (
    <stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
      <stack.Screen name='Home' component={Home} />
      <stack.Screen name='Details' component={Details} />
      <stack.Screen name='Splash' component={Splash} />
    </stack.Navigator>
  )
}
export default Nav;