import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import TreeCard from '../tree-card/TreeCard'
import MarkerCallout from '../marker-callout/MarkerCallout'
const { width, height } = Dimensions.get("window");

const MapDisplay = ({ locations, initialRegion }) => {
    const [region, setRegion] = useState(initialRegion);

    return (
        <View style={styles.container}>

            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={true}
                showsCompass={true}
                rotateEnabled={false}
                onRegionChangeComplete={region => setRegion(region)}
            >
                {locations.map((marker) => <Marker
                    key={marker.UNIQUEID}
                    coordinate={{ latitude: marker.LATITUDE, longitude: marker.LONGITUDE }}
                    image={require('../../../assets/images/tree_marker_2.png')}
                >
                    <MarkerCallout details={marker} />
                </Marker >)}
            </MapView>

            <TouchableOpacity
                style={styles.location}
                onPress={() => console.log(initialRegion)}
            >
                <Image
                    style={{ width: 30, height: 30 }}
                    source={require('../../../assets/images/location_marker.png')}
                />
            </TouchableOpacity>
        </View >
    );
}

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
    location: {
        width: 50,
        height: 50,
        position: "absolute",
        top: 20,
        right: 20,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default MapDisplay;