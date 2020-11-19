import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Maps from "../screens/Map";
import Explore from "../screens/Explore";
import Details from "../screens/Details";
import Login from "../screens/LoginScreen";
import Favorites from "../screens/FavoritesScreen";

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
        <Screen name="Map" component={Maps} />
        <Screen name="Explore" component={Explore} />
        <Screen name="Details" component={Details} />
        <Screen name="Login" component={Login} />
        <Screen name="Favorites" component={Favorites} />
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer theme={MyTheme}>
        <HomeNavigator />
    </NavigationContainer>
);