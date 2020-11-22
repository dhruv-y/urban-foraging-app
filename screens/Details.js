import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, Button, ImageBackground, Dimensions, TextInput, FlatList, Modal, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import { firebase } from '../firebase/config'
import axios from 'axios';
import SingleMapMarker from "../components/maps/single-map-marker/SingleMapMarker"
import { AppLoading } from 'expo';
const API_KEY = 'a9Yagok3eDrzeRbDw-70RUFFZ9HvCzuvM6FsheMRif0'
const { width, height } = Dimensions.get("window");
let currentUser

export default function Details({ route, navigation, onSubmit }) {
    let { treeID, details } = route.params;
    details.treeID = treeID;

    const [isReady, setIsReady] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [comment, setComment] = useState(null);
    const [comments, setAllComments] = useState([]);
    const [plantInfo, setPlantInfo] = useState({
        name: "",
        imageURL: "",
        misc: {
            family: "",
            family_common: "",
            synonyms: []
        }
    })



    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getPlantInfo();
        }
        return () => mounted = false;
    }, [plantInfo]);

    const getPlantInfo = async () => {

        const data = await axios
            .get(`https://trefle.io/api/v1/species/search?token=${API_KEY}&q=${details.SPECIES}&limit=1`)
            .then((res) => {
                setIsReady(true)
                return res.data.data[0]
            })
            .catch(function (error) {
                console.log(error);
            });

        setPlantInfo({
            name: data.common_name,
            imageURL: data.image_url,
            misc: {
                family: data.family,
                family_common: data.family_common_name,
                synonyms: data.synonyms
            }

        });

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

        if (comment.length) {
            // get unique key
            const databaseRef = await firebase.database().ref
                ('/trees/' + treeID).child('comments').push()

            // update tree at key
            databaseRef.set({
                'comment': comment
            })
            alert('Comment added!')
        }

        else {
            alert('Comment cannot be empty!')
        }

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
    }

    const renderComment = ({ item }) => {
        return (
            <View style={styles.card}>
                <MaterialIcons
                    name={"person-outline"}
                    size={30}
                />
                <Text style={{ fontSize: 16, color: 'black', marginTop: 3 }}>{item}</Text>
                <View style={styles.underline}>
                </View>
            </View>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#FFF", }}>
            {

                (!isReady ?
                    <Text style={{ fontSize: 20, color: '#9DA3B4', textAlign: 'center', marginTop: height / 2 }}>Loading...</Text>
                    :
                    <View>
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
                                <Text style={styles.info}>{details.ADDRESS} {details.STREET} ({details.SIDE})</Text>
                            </View>

                            <View style={styles.description}>
                                <Text style={styles.info_sub}>Description</Text>
                                <View style={styles.underline}>
                                </View>
                                <View>
                                    <Text style={styles.info_para}>Also known as {plantInfo.name}. This plant
                        is a species of the {plantInfo.misc.family} family
                        ({plantInfo.misc.family_common}).</Text>
                                    <Text style={styles.info_sub}>Synonyms</Text>
                                    <View style={styles.underline}>
                                    </View>
                                    <Text style={styles.info_para}>[{plantInfo.misc.synonyms.slice(0, 3).join(", ")}]</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.commentContainer}>
                            <TextInput style={styles.comment}
                                placeholder="Visited? Leave a comment for your fellow foragers."
                                onChangeText={(comment) => setComment(comment)}
                                value={comment}
                            />
                            <TouchableOpacity onPress={() => {
                                addComment(comment); () => {
                                    onSubmit(comment)
                                    setComment('')
                                }
                            }}
                                style={styles.commentButton}
                            >
                                <MaterialIcons
                                    name={"add"}
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>

                        <Modal visible={modalOpen} animationType='slide' >
                            <View style={styles.modalContent}>
                                <MaterialIcons
                                    name={"close"}
                                    size={30}
                                    onPress={() => setModalOpen(false)}
                                    style={styles.modalToggle}
                                />

                                {
                                    ((comments.length) ?
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 16, color: '#30a46c', marginLeft: 10, marginBottom: 10 }}>Comments [{comments.length}]</Text>
                                            <View style={{ flex: 1 }}>
                                                <FlatList
                                                    data={comments}
                                                    renderItem={renderComment}
                                                    contentContainerStyle={styles.commentsContainer}
                                                    keyExtractor={(item, index) => index.toString()}
                                                />
                                            </View>
                                        </View>

                                        :
                                        <View>
                                            <Text style={{ fontSize: 20, color: '#9DA3B4', textAlign: 'center', marginTop: height / 3 }}>
                                                No comments yet. Be the first to add one!
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
                        </Modal>


                        <View>
                            {
                                (firebase.auth().currentUser ?

                                    <View style={{
                                        flexDirection: "row",
                                        width: "100%",
                                    }}>
                                        <TouchableOpacity style={{
                                            width: "50%",
                                            backgroundColor: "#00a46c",
                                            height: 70,
                                            marginTop: 20,
                                            borderTopRightRadius: 25,
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                            onPress={() => addToFavorites(details)}
                                        >
                                            <Text style={{
                                                color: "#FFF",
                                                fontSize: 17,
                                                fontWeight: "bold",
                                                alignSelf: 'stretch',
                                                textAlign: 'center',
                                            }}>Mark Visited</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{
                                            width: "50%",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginTop: 20,
                                        }}
                                            onPress={() => { getAllComments(); setModalOpen(true) }}
                                        >
                                            <Text style={{
                                                color: "#62636a",
                                                fontWeight: "bold",
                                                fontSize: 17,
                                                alignSelf: 'stretch',
                                                textAlign: 'center',
                                            }}>Comments</Text>
                                        </TouchableOpacity>
                                    </View>

                                    :
                                    <View style={{
                                        flexDirection: "row",
                                        width: "100%",
                                    }}>
                                        <View style={{
                                            backgroundColor: "#00a46c",
                                            height: 70,
                                            marginTop: 20,
                                            borderTopRightRadius: 25,
                                            borderTopLeftRadius: 25,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "100%",

                                        }}>
                                            <TouchableOpacity style={{
                                                width: "100%",
                                                marginTop: 20,
                                            }}
                                                onPress={() => { getAllComments(); setModalOpen(true) }}
                                            >
                                                <Text style={{
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    fontSize: 17,
                                                    alignSelf: 'stretch',
                                                    textAlign: 'center',
                                                }}>View Comments</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }
                        </View>

                        <View>
                            <SingleMapMarker latitude={details.LATITUDE} longitude={details.LONGITUDE} />
                        </View>
                    </View>

                )
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        height: '100%',
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
        fontSize: 26,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        width: '89%',
    },
    info_sub: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        width: '89%',
    },
    info_para: {
        color: 'black',
        fontSize: 17,
        marginVertical: 8,
        fontStyle: 'italic',
        color: '#9DA3B4'
    },
    commentContainer: {
        flexDirection: 'row',
        height: 95,
        justifyContent: 'center',
        alignItems: 'center',
    },
    comment: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 20,
        fontSize: 14,
        color: 'black',
        width: '80%',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    commentButton: {
        width: 50,
        height: 70,
        borderColor: '#ddd',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
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
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 1,
        padding: 25,
        marginVertical: 8,
    },
    description: {
        paddingHorizontal: 14,
    },
    underline: {
        height: 4,
        backgroundColor: "#b1e5d3",
        width: 50,
        marginTop: -1
    }
});