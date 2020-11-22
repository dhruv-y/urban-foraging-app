import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MarkerCallout from '../marker-callout/MarkerCallout'
const { width, height } = Dimensions.get("window");

// need to load single map markers for different screens
// take in LAT/LONG and render out map view

const SingleMapMarker = ({ latitude, longitude }) => (
    <View style={styles.container}>
        <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
            }}
            showsUserLocation={true}
            showsCompass={true}
            rotateEnabled={false}
            followsUserLocation
        >
            <Marker
                coordinate={{ latitude: latitude, longitude: longitude }}
                image={require('../../../assets/images/tree_marker_3.png')}
            >
            </Marker >
        </MapView>
    </View >
);

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 200,
        width: width,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default SingleMapMarker;