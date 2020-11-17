import React, { useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    FlatList,
    Modal,
    StyleSheet,
    ScrollView
} from "react-native";
import Block from "../components/Block";
import Button from "../components/Button";
import Text from "../components/Text";
import { theme } from "../constants";

const { width, height } = Dimensions.get("window");

class Home extends React.Component {

    render() {
        const { navigation } = this.props;

        return (
            <Block center middle>
                <Block center middle flex={0.5}>
                    <Text h1 center bold>
                        Urban Foraging. <Text h1 primary>Simplfied.</Text>
                        <Text h1 primary>
                            {" "}
                            Simpler.
                        </Text>
                    </Text>

                    <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
                        Enjoy the experience.
                    </Text>
                </Block>
                <Block center middle>
                    <Image
                        source={require("../assets/images/illustration_5.png")}
                        resizeMode="contain"
                        style={{ width, height: height / 2, overflow: "visible" }}
                    />
                </Block>

                <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                    <Button gradient onPress={() => navigation.navigate("Explore")}>
                        <Text center semibold white>
                            Explore
                        </Text>
                    </Button>

                    <Button shadow onPress={() => navigation.navigate("Map")}>
                        <Text center semibold>
                            Edible Tree Map
                        </Text>
                    </Button>
                </Block>
            </Block >
        )
    }
}

export default Home;

