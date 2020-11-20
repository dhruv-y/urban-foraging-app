import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, Button, ImageBackground, Dimensions, TextInput, FlatList, Modal, Card } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import { firebase } from '../firebase/config'
import axios from 'axios';

const API_KEY = 'a9Yagok3eDrzeRbDw-70RUFFZ9HvCzuvM6FsheMRif0'
let currentUser = null;
const { width, height } = Dimensions.get("window");

export default function Details({ route, navigation }) {
    const { treeID, details } = route.params;
    const [modalOpen, setModalOpen] = useState(false);
    const [comment, setComment] = useState(null);
    const [comments, setAllComments] = useState([]);


    const [plantInfo, setPlantInfo] = useState({
        name: "",
        imageURL: "",

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

    const addComment = async (comment) => {
        // get unique key
        const databaseRef = await firebase.database().ref
            ('/trees/' + treeID).child('comments').push()

        // update tree at key
        databaseRef.set({
            'comment': comment
        })
        alert('Comment added!')
    }

    const getAllComments = async () => {
        const newData = []
        await firebase.database().ref('/trees/' + treeID).child('comments')
            .on('value', function (snapshot) {
                snapshot.forEach((item) => {
                    newData.push(item.val().comment)
                })
            });
        setAllComments(newData)
        console.log(comments)
    }

    const renderComment = ({ item }) => {
        console.log(item)
        return (
            <View>
                <Text>{item}</Text>
            </View>
        )
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

            <View>
                {
                    (firebase.auth().currentUser ? <Button
                        onPress={() => addToFavorites(details)}
                        title="+ Favorites"
                    ></Button>
                        :
                        null
                    )
                }
            </View>

            <View>
                <TextInput style={styles.comment}
                    placeholder="Visited? Leave a comment for your fellow foragers."
                    onChangeText={(comment) => setComment(comment)}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            title="Submit"
                            onPress={() => addComment(comment)}
                            color='#30a46c'
                        >
                        </Button>
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button
                        title="View Comments"
                        onPress={() => { getAllComments(); setModalOpen(true) }}
                        color='#30a46c'
                    >
                    </Button>
                </View>
            </View>

            <Modal visible={modalOpen} animationType='slide' >
                <View style={styles.modalContent}>
                    <MaterialIcons
                        name={"close"}
                        size={30}
                        onPress={() => setModalOpen(false)}
                        style={styles.modalToggle}
                    />
                    <FlatList
                        data={comments}
                        renderItem={renderComment}
                        contentContainerStyle={styles.commentsContainer}
                    />
                </View>
            </Modal>
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
    comment: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 20,
        fontSize: 14,
        borderRadius: 15,
        margin: 20,
        color: 'black'
    },
    button: {
        width: '35%',
    },
    buttonContainer: {
        marginRight: 20,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    modalToggle: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 200,
        alignSelf: 'center',
    },
    modalContent: {
        flex: 1,
    },
    commentsContainer: {
        padding: 10,
    },
});