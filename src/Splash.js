import { StyleSheet, Text, View, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { deviceHieght, deviceWidth } from './dimensions'
import { Image } from 'react-native-animatable'
const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => { navigation.replace('Home') }, 2000)
    }, [])
    return (
        <View style={{ justifyContent: "center", alignItems: "center", }}>
            <ImageBackground source={{ uri: "https://img.freepik.com/free-vector/dark-clouds-with-rainfall-thunder-flash-background_1017-32181.jpg?w=1060&t=st=1682400634~exp=1682401234~hmac=09ad9705de823f6f82d4d66d6433ee45fce6d29cc32b092b0f0d97e731ab0e41" }}
                style={{
                    height: deviceHieght,
                    width: deviceWidth
                }}>
                <Image source={require('../Images/weather-forecast.png')} style={{ height: 200, width: 200, borderRadius: 100, alignSelf: "center", marginTop: "60%" }} />
            </ImageBackground>
        </View>
    )
}
export default Splash;
