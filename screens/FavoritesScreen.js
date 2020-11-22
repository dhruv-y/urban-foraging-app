import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, Button, ImageBackground, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import { firebase } from '../firebase/config'
import SingleMapMarker from '../components/maps/single-map-marker/SingleMapMarker'
const { width, height } = Dimensions.get("window");

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

    renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <View style={styles.card_header}>
                    <Text style={{ fontSize: 18, color: 'black', width: '90%', marginBottom: 5 }}>You discovered {item.SPECIES} on {item.STREET}</Text>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Details',
                            {
                                treeID: item.treeID,
                                details: item
                            }
                        )
                    }}>
                        <Text style={{
                            fontSize: 16, color: '#9DA3B4', fontStyle: 'italic'
                        }}>Visit</Text>
                        <View style={{
                            height: 4,
                            backgroundColor: "#b1e5d3",
                            width: 35,
                            marginTop: -3,
                        }}>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <SingleMapMarker latitude={item.LATITUDE} longitude={item.LONGITUDE} />
                </View>
            </View >
        )
    }


    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                {
                    (
                        (this.state.listViewData.length) ?
                            <View style={{ flex: 1 }}>
                                <View style={{
                                    backgroundColor: "#30a46c",
                                    height: "11%",
                                    borderBottomLeftRadius: 22,
                                    borderBottomRightRadius: 22,
                                    paddingHorizontal: 20
                                }}>

                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginTop: 48,
                                        width: "100%"
                                    }}>
                                        <View style={{ width: "80%" }}>
                                            <Text style={{
                                                fontSize: 26,
                                                color: "#FFF",
                                                fontWeight: "bold"
                                            }}>Your favorite trees</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.fav_container}>
                                    <FlatList
                                        data={this.state.listViewData}
                                        renderItem={this.renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            </View>

                            :
                            <View>
                                <Text style={{ fontSize: 18, color: '#9DA3B4', textAlign: 'center', marginTop: height / 2 }}>
                                    No favorites yet. Check out the map to add one!
                                            </Text>
                                <View style={{
                                    height: 4,
                                    backgroundColor: "#b1e5d3",
                                    width: 120,
                                    marginTop: 2,
                                    alignSelf: 'center'
                                }}>
                                </View>
                            </View>
                    )
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: "#00a46c",
        fontSize: 36,
        fontWeight: 'bold',
        alignSelf: 'stretch',
        textAlign: 'center',
    },
    fav_container: {
        flex: 1,
        marginTop: 20,
    },
    card: {
        backgroundColor: 'white',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 1,
        padding: 10,
        height: 250,
        marginVertical: 20,
    },
    card_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default Favorites;

