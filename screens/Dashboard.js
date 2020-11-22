import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { firebase } from '../firebase/config';
import { CommonActions, useNavigation } from '@react-navigation/native'
import Block from "../components/Block";
import Button from "../components/Button";
import Text from "../components/Text";
import { theme } from "../constants";
const { width, height } = Dimensions.get("window");

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
        firebase.auth().signOut().then((user) => {
            console.log('Logged out!')
            this.props.navigation.navigate("Home")
        });
    }

    render() {
        const { navigation } = this.props;
        return (
            <Block center middle>
                <TouchableOpacity onPress={() => this.signOutUser()}
                    style={{
                        height: 20,
                        width: '100%',
                        marginTop: 40,
                        marginRight: 40,
                        alignItems: 'flex-end'
                    }}>
                    <Text>Logout</Text>
                    <View style={{
                        height: 4,
                        backgroundColor: "#b1e5d3",
                        width: 50,
                        marginTop: -3
                    }}>
                    </View>
                </TouchableOpacity>
                <Block center middle flex={0.5}>
                    <Text h1 center bold primary>
                        Forage.
            </Text>
                    <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
                        Welcome, {this.state.email.split("@")[0]}
                    </Text>
                </Block>
                <Block center middle>
                    <Image
                        source={require("../assets/images/illustration_5.png")}
                        resizeMode="contain"
                        style={{ width, height: height / 2, overflow: "visible" }}
                    />
                </Block>

                <Block middle flex={0.8} margin={[0, theme.sizes.padding * 2]}>
                    <Button gradient shadow onPress={() => navigation.navigate("Map")}>
                        <Text center semibold white>
                            Edible Tree Map
                </Text>
                    </Button>
                    <Button shadow onPress={() => navigation.navigate("Favorites")}>
                        <Text center semibold>
                            Favorites
                </Text>
                    </Button>
                </Block>
            </Block >
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

