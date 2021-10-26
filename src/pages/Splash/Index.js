import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Splash = ({ navigation }) => {

    useEffect(() => {
        get();

    }, []);

    const get = async () => {

        let token = await AsyncStorage.getItem('@color');
        if (!token) {
            await AsyncStorage.setItem('@color', "#3366FF");
            await AsyncStorage.setItem('@theme', "S");
        }

        setTimeout(() => {

            navigation.replace('Home');
        }, 3000);
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#282f3b" />
            <View style={{ height: deviceHeight, width: deviceWidth, backgroundColor: '#282f3b', justifyContent: "center", alignItems: 'center' }}>
                <Image source={require('../../img/logo.png')} style={{ resizeMode: 'center', height: 200, width: 200 }} />
            </View>
            <View style={{ backgroundColor: '#282f3b', height: 1000, width: 1000 }}></View>
        </>
    );
}

export default Splash;