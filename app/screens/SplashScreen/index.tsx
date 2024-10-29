import { View, Text, Image, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from './style'
import { createTable } from '../../../SQLiteHelper'

const SplashScreen = ({ navigation }: { navigation: any }) => {

    useEffect(() => {
        createDB()
    }, [])

    const height = Dimensions.get('screen').height
    const width = Dimensions.get('screen').width

    const createDB = () => {
        AsyncStorage.getItem('@tableCreated').then((tableCreated) => {
            if (tableCreated !== "true") {
                createTable((result) => {
                    if (result) {
                        AsyncStorage.setItem('@tableCreated', "true").then(() => {
                            setTimeout(() => {
                                navigation.replace('Home')
                            }, 500);
                        })
                    }
                })
            }else{
                setTimeout(() => {
                    navigation.replace('Home')
                }, 500);
            }
        })


    }

    const image = require('../../assets/images/Splash_logo.png')

    return (
        <View style={styles.container}>
            <Image source={image} style={{height:height,width:width}}  />
        </View>
    )
}

export default SplashScreen