import { StyleSheet, Text, View, ImageBackground, ActivityIndicator, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { deviceHieght, deviceWidth } from './dimensions'
import { Api_key, api_key } from './constant'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';
const Details = (props) => {
  const navigation = useNavigation();
  const [data, setData] = useState([])
  const [indicator, setIndicator] = useState(true)
  const { name, item } = props.route.params;
  const fetchdata = async () => {
    try {
      const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name},${item}&appid=${api_key}`);
      console.log("first_Resp", resp.data);
      if (resp.data) {
        setData(resp.data);
        setIndicator(false);
        // fetchdata1(resp.data.coord)
      }
    } catch (error) {
      navigation.navigate('Home');
      Alert.alert(` "${name}" does not exist`);
    }
  };
  const fetchdata1 = async (item) => {
    console.log("=====>", item)
    try {
      const resposne = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${item.lat}&lon=${item.lon}&exclude=${daily}&appid=${api_key}`);
      console.log(resposne.data);
    } catch (error) {
      console.log("error to fetch");
    }
  };
  const date = new Date()
  useEffect(() => {
    fetchdata();
  }, [name, item]);

  return (
    <View >
      <ImageBackground
        source={{ uri: "https://img.freepik.com/free-vector/dark-clouds-with-rainfall-thunder-flash-background_1017-32181.jpg?w=1060&t=st=1682400634~exp=1682401234~hmac=09ad9705de823f6f82d4d66d6433ee45fce6d29cc32b092b0f0d97e731ab0e41" }}
        style={{
          height: deviceHieght,
          width: deviceWidth,
          borderTopRadius: 100
        }}>
        <Text style={{
          alignSelf: "flex-end",
          color: "white", textDecorationLine: "underline",
          fontStyle: "italic",
          fontSize: 20
        }}>{date.toDateString()}</Text>
        <Text
          style={{ fontSize: 30, fontWeight: "bold", color: "white", alignSelf: "center", textDecorationLine: "underline", marginTop: 60 }}>
          {name.toUpperCase()}
        </Text>
        {indicator ? (<ActivityIndicator />) : (<View style={{ width: "80%", borderRadius: 10, alignSelf: "center", alignItems: "center", flexDirection: "row" }}><Text style={{
          fontSize: 30,
          color: "black",
          alignSelf: "center",
          marginLeft: 100,
          color: "white"
        }}>
          {data?.weather[0]?.main}
        </Text>
          <Image
            source={{ uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png` }}
            style={{ width: 50, height: 50 }}
          />
        </View>)}
        <View style={{ flexDirection: "row", alignSelf: "center", justifyContent: "center" }}>
          <Text style={{ color: "black", fontSize: 30, alignSelf: "center", color: "white", marginRight: 18 }}>
            {(data?.main?.temp - 273).toString().slice(0, 2)}&deg; C
          </Text>
          <Icon name='temperature-high' size={30} color='white' />
        </View>
        <View style={style.div2}>
          <View style={style.divWithText} >
            <ImageBackground source={{ uri: "https://img.freepik.com/free-vector/dark-clouds-with-rainfall-thunder-flash-background_1017-32181.jpg?w=1060&t=st=1682400634~exp=1682401234~hmac=09ad9705de823f6f82d4d66d6433ee45fce6d29cc32b092b0f0d97e731ab0e41" }}
              style={{ height: "100%", width: "100%", position: "absolute", borderWidth: 1, borderColor: "white", borderRadius: 10 }} />
            <Text style={{ color: "white", fontSize: 21, alignSelf: "center" }}>
              Humidity {(data?.main?.humidity)}
            </Text>
          </View>
          <View style={style.divWithText}>
            <ImageBackground source={{ uri: "https://img.freepik.com/free-vector/dark-clouds-with-rainfall-thunder-flash-background_1017-32181.jpg?w=1060&t=st=1682400634~exp=1682401234~hmac=09ad9705de823f6f82d4d66d6433ee45fce6d29cc32b092b0f0d97e731ab0e41" }}
              style={{ height: "100%", width: "100%", position: "absolute", borderWidth: 1, borderColor: "white", borderRadius: 10 }} />
            <Text style={{ color: "white", fontSize: 21, alignSelf: "center", marginRight: 20, }}>
              wind speed {(data?.wind?.speed)} m/s
            </Text>
          </View>

        </View>
      </ImageBackground>
    </View>
  )
}
export default Details;
const style = StyleSheet.create({
  div2: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divWithText: {
    // backgroundColor: "grey",
    height: 70, width: 150,
    justifyContent: "center",
    // opacity: 0.8
  }
})