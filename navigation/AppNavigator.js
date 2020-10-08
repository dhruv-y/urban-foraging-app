import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Browse from "../screens/Browse";

const { Navigator, Screen } = createStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white'
    },
};

const HomeNavigator = () => (
    <Navigator headerMode="none">
        <Screen name="Home" component={Home} />
        <Screen name="Details" component={Details} />
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer theme={MyTheme}>
        <HomeNavigator />
    </NavigationContainer>
);