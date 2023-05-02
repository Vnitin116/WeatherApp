import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Nav from './src/Nav'
import { Provider } from 'react-redux'
import store from './src/Store'
const App = () => {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <Nav/>
      </NavigationContainer>
    </Provider>
  )
}
export default App;