import React, { useState, useEffect } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Modal
} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import { firebase } from '../firebase/config'
import MapDisplay from '../components/maps/map-display/MapDisplay'
import Button from "../components/Button";
import Block from "../components/Block";
import { theme } from "../constants";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
const { width, height } = Dimensions.get("window");

class Map extends React.Component {
    _isMounted = false;

    constructor(props) {
        super();
        // set initial values for lat/long/region
        this.state = {
            loading: false,
            locations: [],
            initialRegion: null,
            filtered: false
        }
    }
    // on mount - retrieve list of tree data from firebase
    componentDidMount() {
        this._isMounted = true;
        this.setState({ loading: true });
        this.getAllLocations();
        this._getLocationAsync();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // nned to add code block for location permissions
    // show user marker on map
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

    getAllLocations = () => {
        firebase.database()
            .ref('/trees')
            .once('value')
            .then((snapshot) => {
                const location = snapshot.val()
                // setstate to retrieved location
                if (this._isMounted) {
                    this.setState({
                        locations: location,
                    });
                }
            });
        this.setState({ filtered: false })

    }

    // function to load favorite markers only
    handleFavorites = async () => {
        let currentUser = await firebase.auth().currentUser
        let that = this
        firebase.database().ref('/users/' + currentUser.uid).child('favorites')
            .on('value', function (snapshot) {
                const newData = []
                snapshot.forEach((item) => {
                    newData.push(item.val().tree)
                });
                that.setState({ locations: newData })
            })
        this.setState({ filtered: true })

    }

    render() {
        const { loading, locations, initialRegion, filtered } = this.state;
        return (
            <View style={{
                backgroundColor: "#FFF",
                flex: 1
            }}>
                <View style={{
                    backgroundColor: "#30a46c",
                    height: "11%",
                    borderBottomLeftRadius: 22,
                    borderBottomRightRadius: 22,
                    paddingHorizontal: 20
                }}>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 48,
                        width: "100%"
                    }}>
                        <View style={{ width: "80%" }}>
                            <Text style={{
                                fontSize: 26,
                                color: "#FFF",
                                fontWeight: "bold"
                            }}>Explore around you</Text>
                        </View>
                    </View>
                </View>
                <MapDisplay locations={locations} initialRegion={initialRegion}></MapDisplay>

                <View style={{ width: '100%', bottom: 0, alignItems: 'center', position: 'absolute', marginBottom: 30 }}>

                    {
                        (
                            firebase.auth().currentUser ?
                                (
                                    filtered ?
                                        <TouchableOpacity style={{
                                            backgroundColor: "#30a46c",
                                            paddingVertical: 10,
                                            borderRadius: 15,
                                            width: '40%'
                                        }}
                                            onPress={() => this.getAllLocations()}
                                        >
                                            <Text style={{
                                                fontWeight: "bold",
                                                fontSize: 14,
                                                color: "#FFF",
                                                textAlign: 'center'
                                            }}>Show All</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={{
                                            backgroundColor: "#00a46c",
                                            paddingVertical: 10,
                                            borderRadius: 15,
                                            width: '40%'
                                        }}
                                            onPress={() => this.handleFavorites()}
                                        >
                                            <Text style={{
                                                fontWeight: "bold",
                                                fontSize: 14,
                                                color: "#FFF",
                                                textAlign: 'center'
                                            }}>Filter Favorites</Text>
                                        </TouchableOpacity>
                                )

                                :
                                null
                        )

                    }

                </View>
            </View >
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
    },
    modalToggle: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 200,
        alignSelf: 'center',
    },
    modalContent: {
        flex: 1,
        margin: 0,
    },
});

export default Map