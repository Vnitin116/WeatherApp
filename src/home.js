import { View, Text, Image, ImageBackground, Touchable, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { deviceHieght, deviceWidth } from './dimensions'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from "react-redux";
import { addRecentSearch } from './recentSearchesSlice';
import { requestUserPermission, GetFCMToken, notificationListener } from './Pushnotification.js'
const Home = ({ navigation }) => {
    let arr = [];
    let arr2 = [];

    const [] = useState('')
    const dispatch = useDispatch();
    // Redux selector with filtered data
    const recentSearches = useSelector(state => state.recentSearches);
    const firstfilter = new Set(recentSearches);
    const filteredData = [...firstfilter]
    // useState hooks
    const [city, setCity] = useState('')
    const [indicator, setIndicator] = useState(false)

    const nav = () => {
        if (city !== "") {
            setIndicator(false)
            dispatch(addRecentSearch({ search: city })),
                navigation.navigate('Details', { name: city })
        } else {
            setIndicator(false)
            alert('fill your city name')
        }
    }
    useEffect(() => {
        if (requestUserPermission) {

            console.log("##############3==>", GetFCMToken())
                , notificationListener()
        }
    }, [])
    return (
        <View>
            <ImageBackground source={{ uri: "https://img.freepik.com/free-vector/dark-clouds-with-rainfall-thunder-flash-background_1017-32181.jpg?w=1060&t=st=1682400634~exp=1682401234~hmac=09ad9705de823f6f82d4d66d6433ee45fce6d29cc32b092b0f0d97e731ab0e41" }}
                style={style.bgImg} >
                <View style={{ position: "absolute" }}>
                    <View style={{ paddingHorizontal: 5 }} >
                        <TouchableOpacity activeOpacity={0.1}>
                            <Icon name='menu' size={50} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                        <TouchableOpacity>
                            <View style={style.divWithTxtinp}>
                                <TextInput style={style.txtinpt} placeholder='Enter the name of your city'
                                    value={city} placeholderTextColor={"black"}
                                    onChangeText={(val) => setCity(val)} />
                                <TouchableOpacity onPress={() => {
                                    setIndicator(true),
                                        arr.push(city),
                                        setTimeout(() => { nav() }, 2000)
                                }}>
                                    <Icon name='search' size={25} color="black" style={{ marginRight: 5 }} />
                                </TouchableOpacity>
                            </View>

                        </TouchableOpacity>
                        {indicator ? (<ActivityIndicator style={{ alignSelf: "center" }} size={'large'} />) : (null)}
                    </View>
                    {filteredData.length > 0 && <Text style={{ color: "white", fontSize: 20, marginTop: "40%", color: "black", marginLeft: 10 }}>
                        Recent search..
                    </Text>}
                    <FlatList
                        data={filteredData}
                        horizontal
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => {
                                    setIndicator(true),
                                        arr.push(city),
                                        storeData(),
                                        setTimeout(() => { navigation.navigate('Details', { name: item }), setIndicator(false) }, 2000)
                                }}>
                                <View style={{}}>
                                    <Image
                                        source={{ uri: "https://img.freepik.com/free-vector/dark-clouds-with-rainfall-thunder-flash-background_1017-32181.jpg" }}
                                        style={{
                                            height: deviceHieght - 500,
                                            width: deviceWidth - 200,
                                            resizeMode: 'cover',
                                            borderRadius: 15,
                                            borderWidth: 2,
                                            borderColor: "white",
                                            marginRight: 25,
                                            marginLeft: 5,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            position: 'absolute',
                                            zIndex: 1,
                                            color: "black",
                                            fontSize: 24,
                                            fontWeight: "bold",
                                            padding: 10,
                                            textAlign: 'center',
                                            borderRadius: 15,
                                            top: 100,
                                            bottom: 0,
                                            left: 0,
                                            right: 30,
                                        }}
                                    >
                                        {item.toUpperCase()}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        } />
                </View>
            </ImageBackground>
        </View>
    )
}
export default Home;
const style = StyleSheet.create({
    bgImg: {
        height: deviceHieght,
        width: deviceWidth
    },
    toptxt: {
        fontSize: 23,
        fontWeight: "600",
        color: "white",
        fontStyle: "italic",
        textDecorationLine: "underline"

    },
    txtinpt: {
        width: "87%",
        marginLeft: 10,
        fontSize: 16
    },
    divWithTxtinp: {
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        height: 50,
        alignSelf: "center",
        width: "90%",
        borderRadius: 20,
        marginTop: 10,
        borderWidth: 0.5,
        elevation: 25,
        borderWidth: 4,
        borderColor: "white"
    },
    searches: {
        fontSize: 23,
        color: "white",
        // fontStyle: "italic",
        fontWeight: "400",
        marginTop: 80,
        textDecorationLine: "underline"

    }
})