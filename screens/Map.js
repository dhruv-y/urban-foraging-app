import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import database from '@react-native-firebase/database';
import { firebase } from '../firebase/config'
import MapDisplay from '../components/maps/map-display/MapDisplay'

export default function Map({ navigation }) {

    const [locations, setLocations] = useState(null);
    useEffect(() => {
        if (!locations) {
            getLocations();
        }
    }, [])

    const getLocations = async () => {
        await firebase.database()
            .ref('/')
            .once('value')
            .then(snapshot => {
                setLocations(snapshot.val())
            });
    }

    return (
        <View>
            <Text>Welcome to Maps!</Text>
            <MapDisplay locations={locations}></MapDisplay>
        </View>
    )
}
