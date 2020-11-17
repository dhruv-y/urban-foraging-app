import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Callout } from 'react-native-maps'
import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Button,
} from 'react-native';

const MarkerCallout = ({ details }) => {

    const [info, getInfo] = useState({
        ID: null,
        name: details.SPECIES,
        imageURL: "",
        address: details.ADDRESS,
        street: details.STREET
    });

    return (
        <Callout tooltip >
            <View style={styles.container}>
                <Text style={styles.title}>{info.name}</Text>
                <View>
                    <Image
                        style={{ width: 10, height: 10 }}
                        source={require('../../../assets/images/location_marker_1.png')}
                    />
                    <Text style={styles.title}>{info.address} {info.street}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button title='Details'
                        color='#00a46c'
                    />
                </View>
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
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
    },
    buttonContainer: {
        padding: 10,
        margin: 5,
    }
});

export default MarkerCallout;