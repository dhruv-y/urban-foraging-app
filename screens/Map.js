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

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            locations: []
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
    }


    render() {
        const { loading, locations } = this.state;
        return (
            <View>
                <Text>Welcome to Maps!</Text>
                <MapDisplay locations={locations}></MapDisplay>
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