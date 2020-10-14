import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import myMap from "../screens/Map";

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
        <Screen name="Map" component={myMap} />
        <Screen name="Home" component={Home} />
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer theme={MyTheme}>
        <HomeNavigator />
    </NavigationContainer>
);