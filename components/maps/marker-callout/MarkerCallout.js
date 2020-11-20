import React, { useState, useEffect } from 'react';
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
import { MaterialIcons } from "@expo/vector-icons"

const MarkerCallout = ({ details }) => {

    const [info, getInfo] = useState({
        ID: null,
        name: details.SPECIES,
        address: details.ADDRESS,
        street: details.STREET
    });

    return (
        <Callout>
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>

                    <Text style={styles.title}>Specie - {info.name}</Text>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', marginTop: 10 }}>
                    <MaterialIcons
                        name={"location-on"}
                        size={20}
                        style={{ marginTop: 2 }}
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