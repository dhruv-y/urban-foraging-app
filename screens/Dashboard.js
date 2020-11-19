import React from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { firebase } from '../firebase/config';
import { CommonActions, useNavigation } from '@react-navigation/native'

class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "",
        }
    }

    componentDidMount() {
        const { email } = firebase.auth().currentUser;
        this.setState({ email })
    }

    signOutUser() {
        alert('here')
        firebase.auth().signOut();
        navigation.navigate("Home")
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Welcome {this.state.email}
                </Text>
                <TouchableOpacity onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <Button
                    onPress={() => navigation.navigate("Favorites")}
                    title="Favorites">
                </Button>

                <Button
                    onPress={() => navigation.navigate("Map")}
                    title="Map">
                </Button>
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

export default Dashboard;

