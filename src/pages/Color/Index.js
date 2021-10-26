import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Color = ({ navigation, route }) => {

    const [darkMode, setDarkMode] = useState(route.params.theme);

    async function handleSetColor(col) {
        await AsyncStorage.setItem('@color', col);
        navigation.goBack();        
    }

    return (
        <View style={{ backgroundColor: darkMode ? '#282f3b' : '#f5f5f5', flex: 1 }}>

            <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.goBack()} style={{position:'absolute', top:45, left:30}}>
               <Icon name="arrow-back-outline" size={30} color={ !darkMode ? '#282f3b' : '#f5f5f5'} />
            </TouchableOpacity>

            <View style={{ justifyContent: 'center', alignItems: "center", flex: 1 }}>
                <Text style={{ color: !darkMode ? '#282f3b' : '#f5f5f5', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Choose the primary color for your calculator:</Text>
            </View>

            <View style={{ flex: 2, }}>
                <TouchableOpacity onPress={() => handleSetColor('#3366FF')} activeOpacity={.8} style={{ backgroundColor: '#3366FF', width: 300, borderRadius: 5, alignSelf: 'center', height: 80, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color:'#fff' }}>#3366FF</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSetColor('#77BF20')} activeOpacity={.8} style={{ backgroundColor: '#77BF20', width: 300, borderRadius: 5, alignSelf: 'center', height: 80, marginTop: 15, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color:'#fff' }}>#77BF20</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSetColor('#FFAA00')} activeOpacity={.8} style={{ backgroundColor: '#FFAA00', width: 300, borderRadius: 5, alignSelf: 'center', height: 80, marginTop: 15, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color:'#fff' }}>#119CFF</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSetColor('#FF4830')} activeOpacity={.8} style={{ backgroundColor: '#FF4830', width: 300, borderRadius: 5, alignSelf: 'center', height: 80, marginTop: 15, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color:'#fff' }}>#FF4830</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Color;