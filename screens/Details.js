import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, Button, ImageBackground, Dimensions, TextInput } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import { firebase } from '../firebase/config'
import axios from 'axios';
const API_KEY = 'a9Yagok3eDrzeRbDw-70RUFFZ9HvCzuvM6FsheMRif0'
let currentUser = null;
const { width, height } = Dimensions.get("window");

export default function Details({ route, navigation }) {
    const { treeID, details } = route.params;
    const [plantInfo, setPlantInfo] = useState({
        name: "",
        imageURL: "",
        health: 0,
        edibility: 0,
        yield: 0,
    })

    useEffect(() => {
        getPlantInfo();
    }, [])

    const getPlantInfo = async () => {
        const data = await axios
            .get(`https://trefle.io/api/v1/species/search?token=${API_KEY}&q=${details.SPECIES}&limit=1`)
            .then((res) => {
                return res.data.data[0]
            })
            .catch(function (error) {
                console.log(error);
            });

        setPlantInfo({
            name: data.common_name,
            imageURL: data.image_url,
            health: 0,
            edibility: 0,
            yield: 0,
        });
    }

    const handleHealth = (e, val) => {
        firebase.database().ref(`/trees` + treeID).update({
            "HEALTH": val
        })
        alert("submission recorded!")
    }

    const addToFavorites = async (details) => {
        // get current user
        currentUser = await firebase.auth().currentUser

        // get unique key
        const databaseRef = await firebase.database().ref
            ('/users/' + currentUser.uid).child('favorites').push();

        // update tree at key
        databaseRef.set({
            'tree': details
        })
        alert('Added to favorites!')
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={{
                    uri: plantInfo.imageURL + ".jpg",
                }}
                style={styles.image}
                imageStyle={{
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    opacity: 1
                }}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>{plantInfo.name}</Text>
                    <Text style={styles.subtitle}>{details.SPECIES}</Text>

                </View>
            </ImageBackground>

            <View style={styles.body}>
                <View style={styles.location}>
                    <Image
                        style={{ width: 30, height: 30, marginTop: 5 }}
                        source={require('../assets/images/location_marker_2.png')}
                    />
                    <Text style={styles.info}>{details.ADDRESS} {details.STREET}</Text>
                </View>

                <View style={styles.tags}>
                    <Image
                        style={{ width: 30, height: 30, marginTop: 7 }}
                        source={require('../assets/images/info_icon.png')}
                    />
                    <View style={styles.tag}>
                        <Text style={styles.tag_text}>Health</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.tag_text}>Edibility</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.tag_text}>Yield</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.info}>Visited?</Text>

            <View
                // onPress={()=>navigation.navigate("Detail")}
                style={{
                    height: 80,
                    elevation: 2,
                    backgroundColor: "#FFF",
                    marginTop: 80,
                    borderRadius: 15,
                    paddingHorizontal: 20
                }}
            >
                <Text>Tree Health </Text>
                <View style={styles.buttons}>
                    <View style={styles.buttonContainer}>
                        <Button title="1"
                            color="#00BFA6"
                            onPress={(e) => handleHealth(e, 1)} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="2"
                            color="#00BFA6"
                            onPress={(e) => handleHealth(e, 2)}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="3"
                            color="#00BFA6"
                            onPress={(e) => handleHealth(e, 3)}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="4"
                            color="#00BFA6"
                            onPress={(e) => handleHealth(e, 4)}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="5"
                            color="#00BFA6"
                            onPress={(e) => handleHealth(e, 5)}
                        />
                    </View>
                </View>
            </View>

            <View
                // onPress={()=>navigation.navigate("Detail")}
                style={{
                    height: 80,
                    elevation: 2,
                    backgroundColor: "#FFF",
                    marginTop: 15,
                    borderRadius: 15,
                    width: '80%',
                    marginLeft: 14
                }}
            >
                <Text>Current Yield</Text>
                <TextInput placeholder="Between 0-5"
                    style={styles.input}
                />
            </View>

            <View
                // onPress={()=>navigation.navigate("Detail")}
                style={{
                    height: 80,
                    elevation: 2,
                    backgroundColor: "#FFF",
                    marginTop: 15,
                    borderRadius: 15,
                    width: '80%',
                    marginLeft: 14
                }}
            >
                <Text>Edibility</Text>
                <TextInput placeholder="Between 0-5"
                    style={styles.input}
                />
            </View>

            <View>
                <Button
                    onPress={() => addToFavorites(details)}
                    title="+ Favorites"
                ></Button>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
    },
    image: {
        width: width,
        height: 340,
        justifyContent: 'flex-end',
    },
    header: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        bottom: 0,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    title: {
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold',
        paddingHorizontal: 14,
    },
    subtitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 15,
        paddingHorizontal: 14,
    },
    body: {
        marginTop: 20,
        paddingHorizontal: 14,
    },
    location: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 60,
    },
    info: {
        color: 'black',
        fontSize: 28,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        width: '89%'
    },
    tags: {
        flex: 1,
        flexWrap: 'wrap',
        position: 'relative',
    },
    tag: {
        backgroundColor: "#00a46c",
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 15,
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    tag_text: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#FFF",
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 14,
        borderRadius: 15,
        margin: 5,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        marginLeft: 5,
    }
});