import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Alert
} from "react-native";
import { firebase } from '../firebase/config'
import Block from "../components/Block";
import Button from "../components/Button";
import Text from "../components/Text";
import Input from "../components/Input";
import { theme } from "../constants";

const __isValidEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export default class Login extends Component {

    constructor(props) {
        super()

        this.state = ({
            email: "",
            password: ""
        })
    }

    handleRegister() {
        try {
            if (!this.state.password && this.state.password.trim() && this.state.password.length > 6) {
                Alert.alert("Register Error ❌", "Please enter at least 6 characters!")
                return;
            }

            else if (!this.state.email) {
                Alert.alert("Register Error ❌", "Email is required!")
                return;
            }

            else if (!__isValidEmail(this.state.email)) {
                Alert.alert("Register Error ❌", "Email is poorly formatted!")
                return;
            }

            firebase.auth().createUserWithEmailAndPassword(this.state.email.trim(), this.state.password)
                .then((user) => {
                    Alert.alert("Register Success ✅", 'Your Forage account was successfully created')
                    this.props.navigation.navigate("Dashboard")
                });

        } catch (error) {
            console.log(error.message)
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
                    this.props.navigation.navigate("Dashboard")
                });

        } catch (error) {
            console.log(error.message)
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