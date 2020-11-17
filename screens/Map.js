import React, { useState, useEffect } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import database from '@react-native-firebase/database';
import { firebase } from '../firebase/config'
import MapDisplay from '../components/maps/map-display/MapDisplay'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            locations: [],
            initialRegion: null
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        firebase.database()
            .ref('/')
            .once('value')
            .then((snapshot) => {
                const location = snapshot.val()
                this.setState({
                    locations: location,
                });
            });
        this._getLocationAsync();

    }

    _getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('Permission Not Granted!');
        }

        const location = await Location.getCurrentPositionAsync({ enabledHighAccuracy: true });
        let region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
        }

        this.setState({ initialRegion: region })
    }

    render() {
        const { loading, locations, initialRegion } = this.state;
        return (
            <View style={{
                backgroundColor: "#FFF",
                flex: 1
            }}>
                <View style={{
                    backgroundColor: "#00a46c",
                    height: "10%",
                    borderBottomLeftRadius: 22,
                    borderBottomRightRadius: 22,
                    paddingHorizontal: 20
                }}>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 45,
                        width: "100%"
                    }}>
                        <View style={{ width: "80%" }}>
                            <Text style={{
                                fontSize: 24,
                                color: "#FFF",
                                fontWeight: "bold"
                            }}>Explore around you</Text>
                        </View>
                    </View>
                </View>
                <MapDisplay locations={locations} initialRegion={initialRegion}></MapDisplay>
            </View>
        )
    }
}

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

export default Map