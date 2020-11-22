import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Maps from "../screens/Map";
import Details from "../screens/Details";
import Login from "../screens/LoginScreen";
import Favorites from "../screens/FavoritesScreen";
import Dashboard from "../screens/Dashboard";
import LoadingScreen from "../screens/LoadingScreen";

const { Navigator, Screen } = createStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white'
    },
};

// creating navigator for app screens
const HomeNavigator = () => (
    <Navigator headerMode="none">
        <Screen name="LoadingScreen" component={LoadingScreen} />
        <Screen name="Home" component={Home} />
        <Screen name="Map" component={Maps} />
        <Screen name="Details" component={Details} />
        <Screen name="Login" component={Login} />
        <Screen name="Favorites" component={Favorites} />
        <Screen name="Dashboard" component={Dashboard} />
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer theme={MyTheme}>
        <HomeNavigator />
    </NavigationContainer>
);