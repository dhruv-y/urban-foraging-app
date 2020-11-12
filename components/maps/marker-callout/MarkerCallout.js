import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Callout } from 'react-native-maps'
import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';

const API_KEY = 'a9Yagok3eDrzeRbDw-70RUFFZ9HvCzuvM6FsheMRif0'

const MarkerCallout = ({ details }) => {

    const [info, getInfo] = useState({
        ID: null,
        name: details.SPECIES,
        imageURL: "",
        address: details.ADDRESS,
        street: ""
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
        <Callout tooltip>
            <View style={styles.container}>
                <Text style={styles.title}>{info.name}</Text>
            </View>
        </Callout>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ccc',
        padding: 15,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 5,
    },
    img: {
        width: 40,
        height: 60
    }
});

export default MarkerCallout;