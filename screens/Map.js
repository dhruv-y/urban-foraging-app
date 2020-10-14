import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import database from '@react-native-firebase/database';
import { firebase } from '../firebase/config'

export default function Map({ navigation }) {
    firebase.database()
        .ref('/')
        .once('value')
        .then(snapshot => {
            console.log("Tree Data: ", snapshot.val())
        });

    return (
        <View>
            <Text>Welcome to Maps!</Text>
        </View>
    )
}
