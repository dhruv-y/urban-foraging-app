import React, { useState } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: height,
        width: width,
        marginTop: height / 9,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

const MapDisplay = (props) => {

    const [region, setRegion] = useState({
        latitude: 39.1636505,
        longitude: -86.525757,
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
                {props.locations.map((marker) => <Marker
                    key={marker.UNIQUEID}
                    coordinate={{ latitude: marker.LATITUDE, longitude: marker.LONGITUDE }}
                    image={require('../../../assets/images/tree_marker_1.png')}
                    title={`Specie - ${marker.SPECIES}`}
                    description={`Address - ${marker.ADDRESS} ${marker.STREET}`}
                >
                </Marker >)}
            </MapView>
        </View >
    );
}

export default MapDisplay;