import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, Button, Platform, Modal } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import { firebase } from '../firebase/config'

const API_KEY = 'a9Yagok3eDrzeRbDw-70RUFFZ9HvCzuvM6FsheMRif0'

export default function Details({ route, navigation }) {
    const { treeID } = route.params;
    console.log(treeID)

    firebase.database()
        .ref(`/${treeID}`)
        .once('value')
        .then((snapshot) => {
            const details = snapshot.val()
            console.log(details)
        });

    const getPlantInfo = async () => {
        const data = await axios
            .get(`https://trefle.io/api/v1/species/search?token=${API_KEY}&q=${details.SPECIES}&limit=1`)
            .then(function (response) {
                console.log(response)
                return
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <View styel={styles.container}>
            <Text>Here!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
    },
});