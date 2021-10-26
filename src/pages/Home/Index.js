import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, StatusBar, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import Entypo from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { hideNavigationBar } from 'react-native-navigation-bar-color'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({navigation}) {
    const [darkMode, setDarkMode] = useState();
    const [currentNumber, setCurrentNumber] = useState('');
    const [lastNumber, setLastNumber] = useState('');
    const [color, setColor] = useState()

    const buttons = ['C', 'DEL', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='];

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            handleGetColor();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        hideNavigationBar();
    }, []); 

    async function setDark (d){
        setDarkMode(d);
        await AsyncStorage.setItem('@theme', d ? "S" :"N" );
   }

    async function handleGetColor(){
        let col = await AsyncStorage.getItem('@color');
        let them = await AsyncStorage.getItem('@theme');       

        setColor(col);
        setDarkMode(them ==='S' ? true : false);
        
    }    

    function calculator() {

        let lastArr = currentNumber[currentNumber.length - 1];

        if (lastArr === '/' || lastArr === '*' || lastArr === '-' || lastArr === '+' || lastArr === '.') {
            setCurrentNumber(currentNumber)
            return
        }
        else {
            let result = eval(currentNumber).toString();
            setCurrentNumber(result)
            return
        }
    }

    function handleInput(buttonPressed) {
        if (buttonPressed === '+' || buttonPressed === '-' || buttonPressed === '*' || buttonPressed === '/') {
            Vibration.vibrate(35);
            setCurrentNumber(currentNumber + buttonPressed)
            return
        }
        else if (buttonPressed === 1 || buttonPressed === 2 || buttonPressed === 3 || buttonPressed === 4 || buttonPressed === 5 ||
            buttonPressed === 6 || buttonPressed === 7 || buttonPressed === 8 || buttonPressed === 9 || buttonPressed === 0 || buttonPressed === '.') {
            Vibration.vibrate(35);
        }
        switch (buttonPressed) {
            case 'DEL':
                Vibration.vibrate(35);
                setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
                return
            case 'C':
                Vibration.vibrate(35);
                setLastNumber('')
                setCurrentNumber('')
                return
            case '=':
                Vibration.vibrate(35);
                setLastNumber(currentNumber + '=')
                calculator()
                return
        }
        setCurrentNumber(currentNumber + buttonPressed)
    }

    const styles = StyleSheet.create({
        results: {
            backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
            maxWidth: '100%',
            minHeight: '35%',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
        },
        resultText: {
            maxHeight: 45,
            color: color,
            margin: 15,
            fontSize: 35,
        },
        historyText: {
            color: darkMode ? '#B5B7BB' : '#7c7c7c',
            fontSize: 20,
            marginRight: 10,
            alignSelf: 'flex-end',
        },
        themeButton: {
            alignSelf: 'flex-start',
            position: 'absolute',
            top: 20,
            left: 0,
            bottom: '5%',
            margin: 15,
            backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
        },
        themeButton2: {
            alignSelf: 'flex-start',
            position: 'absolute',
            top: 20,
            right: 0,
            bottom: '5%',
            margin: 15,
            backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
        },
        buttons: {
            width: '100%',
            height: '35%',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        button: {
            borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '24%',
            minHeight: '54%',
            flex: 2,
        },
        textButton: {
            color: darkMode ? '#b5b7bb' : '#7c7c7c',
            fontSize: 28,
        }
    })

    return (
        <View>
            <StatusBar backgroundColor={darkMode ? '#282f3b' : '#f5f5f5'} barStyle={darkMode ? 'light-content' : 'dark-content'} />
            <View style={styles.results}>
                <TouchableOpacity style={styles.themeButton} onPress={() => setDark(!darkMode)}>
                    <Entypo name={darkMode ? 'sunny-outline' : 'moon-outline'} size={24} color={darkMode ? 'white' : 'black'}  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.themeButton2} onPress={() => navigation.navigate('Color',{theme:darkMode})}>
                    <Entypo name={'settings-outline'} size={24} color={darkMode ? 'white' : 'black'}  />
                </TouchableOpacity>
                <Text style={styles.historyText}>{lastNumber}</Text>
                <Text style={styles.resultText}>{currentNumber}</Text>
            </View>
            <View style={styles.buttons}>
                {buttons.map((button) =>
                    button === '=' || button === '/' || button === '*' || button === '-' || button === '+' ?
                        <TouchableOpacity key={button} style={[styles.button, { backgroundColor: color }]} onPress={() => handleInput(button)}>
                            <Text style={[styles.textButton, { color: 'white', fontSize: 28 }]}>{button}</Text>
                        </TouchableOpacity>
                        :
                        button === 0 ?
                            <TouchableOpacity key={button} style={[styles.button, { backgroundColor: typeof (button) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '36%' }]} onPress={() => handleInput(button)}>
                                <Text style={styles.textButton}>{button}</Text>
                            </TouchableOpacity>
                            :
                            button === '.' || button === 'DEL' ?
                                <TouchableOpacity key={button} style={[styles.button, { backgroundColor: button === '.' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '37%' }]} onPress={() => handleInput(button)}>
                                    <Text style={styles.textButton}>{button}</Text>
                                </TouchableOpacity>
                                :
                                button === 'C' ?
                                    <TouchableOpacity key={button} style={[styles.button, { backgroundColor: typeof (button) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '36%' }]} onPress={() => handleInput(button)}>
                                        <Text style={styles.textButton}>{button}</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity key={button} style={[styles.button, { backgroundColor: typeof (button) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed' }]} onPress={() => handleInput(button)}>
                                        <Text style={styles.textButton}>{button}</Text>
                                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
