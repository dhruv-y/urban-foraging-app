import React, { useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    FlatList,
    StyleSheet,
    ScrollView,
    LayoutAnimation,
    View
} from "react-native";
import Block from "../components/Block";
import Button from "../components/Button";
import Text from "../components/Text";
import { theme } from "../constants";
import { firebase } from '../firebase/config'
const { width, height } = Dimensions.get("window");

class Home extends React.Component {

    render() {
        const { navigation } = this.props;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        return (
            <Block center middle>
                <Block center middle flex={0.7}>
                    <Text h1 center bold primary>
                        Forage.
                    </Text>
                    <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
                        Urban Foraging. Simplified.
                    </Text>
                    <View style={{
                        height: 4,
                        backgroundColor: "#b1e5d3",
                        width: 60,
                        marginTop: 4
                    }}>
                    </View>
                </Block>
                <Block center middle>
                    <Image
                        source={require("../assets/images/illustration_5.png")}
                        resizeMode="contain"
                        style={{ width, height: height / 2, overflow: "visible" }}
                    />
                </Block>

                <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                    <Button gradient shadow onPress={() => navigation.navigate("Map")}>
                        <Text center semibold white>
                            Edible Tree Map
                        </Text>
                    </Button>
                    <Button shadow onPress={() => navigation.navigate("Login")}>
                        <Text center semibold>
                            Login
                        </Text>
                    </Button>
                </Block>
            </Block >
        )
    }
}

export default Home;

