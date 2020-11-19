import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, Button, ImageBackground, Dimensions, FlatList } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import { firebase } from '../firebase/config'
const { width, height } = Dimensions.get("window");
let currentUser = null;

class Favorites extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            listViewData: []
        }
    }

    componentDidMount() {
        this.getFavorites();
    }

    getFavorites = async () => {
        let currentUser = await firebase.auth().currentUser
        let that = this
        firebase.database().ref('/users/' + currentUser.uid).child('favorites')
            .on('value', function (snapshot) {
                const newData = [...that.state.listViewData]
                snapshot.forEach((item) => {
                    newData.push(item.val().tree)
                });
                that.setState({ listViewData: newData })
            })
    }

    renderItem({ item }) {
        return (
            <View>
                <Text>{item.SPECIES}</Text>
            </View>
        )
    }


    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Favorites
            </Text>

                <FlatList
                    data={this.state.listViewData}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
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

export default Favorites;

