import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { firebase } from '../firebase/config';

class LoadingScreen extends React.Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { navigation } = this.props;
        firebase.auth().onAuthStateChanged(user => {
            navigation.navigate(user ? "Dashboard" : "Home")
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large'></ActivityIndicator>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
    },
    title: {
        color: "#00a46c",
        fontSize: 36,
        fontWeight: 'bold',
        paddingHorizontal: 14,
    },
});

export default LoadingScreen;

