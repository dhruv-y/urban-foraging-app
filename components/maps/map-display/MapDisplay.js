import React, { useState } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 800,
        width: 400,
        alignItems: 'center',
        marginTop: 100,
        marginLeft: 30,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    header: {
        fontSize: 20,
        margin: 15,
    }
});

const MapDisplay = (props) => {

    if (props) {
        let markers = props.locations
    }


    const [region, setRegion] = useState({
        latitude: 51.5078788,
        longitude: -0.0877321,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
    });

    return (
        <View style={styles.container}>

            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={region}
                onRegionChangeComplete={region => setRegion(region)}
            >

            </MapView>
        </View>
    );
}


export default MapDisplay;