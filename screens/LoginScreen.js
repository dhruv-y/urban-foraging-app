import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image
} from "react-native";
import { firebase } from '../firebase/config'
import Block from "../components/Block";
import Button from "../components/Button";
import Text from "../components/Text";
import Input from "../components/Input";
import { theme } from "../constants";

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            email: "",
            password: ""
        })
    }

    handleRegister() {
        try {
            if (this.state.password.length < 6) {
                alert("Please enter at least 6 characters!")
                return;
            }

            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((user) => {
                    alert("Register Success!")
                    this.props.navigation.navigate("Dashboard")
                });

        } catch (error) {
            console.log(error.toString())
        }
    }

    handleLogin() {
        try {
            if (this.state.password.length < 6) {
                alert("Please enter at least 6 characters!")
                return;
            }

            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((user) => {
                    alert("Login Success!")
                    this.props.navigation.navigate("Dashboard")
                });

        } catch (error) {
            console.log(error.toString())
        }
    }

    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;
        const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

        return (
            <Block padding={[0, theme.sizes.base * 2]}>
                <View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: -385 },] }}>
                    <Image
                        source={require('../assets/images/background.jpg')}
                        style={{ flex: 1, height: null, width: null }}
                    />
                </View>
                <Block bottom>
                    <Text h1 bold white>
                        Login
                    </Text>

                    <Input
                        label="Email"
                        onChangeText={(email) => this.setState({ email })}
                    />

                    <Input
                        secure
                        label="Password"
                        onChangeText={(password) => this.setState({ password })}
                    />

                    <View style={{ alignItems: 'center' }}>
                        <Button gradient onPress={() => this.handleLogin()}>
                            <Text bold white center>
                                Login
                        </Text>
                        </Button>
                        <Button gradient onPress={() => this.handleRegister()}>
                            <Text bold white center>
                                Register
                        </Text>
                        </Button>

                        <Button>
                            <Text
                                gray
                                caption
                                center
                                style={{ textDecorationLine: "underline" }}
                            >
                                Forgot your password?
                         </Text>
                        </Button>

                    </View>
                </Block >
            </Block >
        );
    }
}

const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: "center",

    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
});