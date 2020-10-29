import React from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import { TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'

const Explore = ({ navigation }) => {
    return (
        <View style={{
            backgroundColor: "#FFF",
            flex: 1
        }}>
            <View style={{
                backgroundColor: "#00a46c",
                height: "20%",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                paddingHorizontal: 20
            }}>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 45,
                    width: "100%"
                }}>
                    <View style={{ width: "50%" }}>
                        <Text style={{
                            fontSize: 32,
                            color: "#FFF",
                            fontWeight: "bold"
                        }}>Explore</Text>
                    </View>
                </View>
            </View>
            <LinearGradient
                colors={["rgba(0,164,109,0.4)", "transparent"]}
                style={{
                    left: 0,
                    right: 0,
                    height: 90,
                    marginTop: -45
                }}
            >
                <View style={{
                    backgroundColor: "#FFF",
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    marginHorizontal: 20,
                    borderRadius: 15,
                    marginTop: 25,
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="#b1e5d3"
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            width: 260
                        }}
                    />
                </View>
            </LinearGradient>


            <View style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                width: "100%",
                alignItems: "center"
            }}>
                <View style={{ width: "50%" }}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 17,
                        color: "#585a61"
                    }}>Recommended</Text>
                    <View style={{
                        height: 4,
                        backgroundColor: "#b1e5d3",
                        width: 115,
                        marginTop: -5
                    }}>
                    </View>

                </View>
                <View style={{ width: "50%", alignItems: "flex-end" }}>
                    <View style={{
                        backgroundColor: "#00a46c",
                        paddingHorizontal: 25,
                        paddingVertical: 5,
                        borderRadius: 15
                    }}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 14,
                            color: "#FFF"
                        }}>More </Text>
                    </View>
                </View>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ height: 400 }}
            >
                <LinearGradient
                    colors={["rgba(0,164,109,0.09)", "transparent"]}
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        height: 100,
                        marginTop: 220,
                        top: 0
                    }}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate("Detail")}
                    style={{
                        height: 250,
                        elevation: 2,
                        backgroundColor: "#FFF",
                        marginLeft: 20,
                        marginTop: 20,
                        borderRadius: 15,
                        marginBottom: 10,
                        width: 160
                    }}
                >
                    <Image
                        source={require('../assets/images/plant1.png')}
                    />
                    <View style={{
                        flexDirection: "row",
                        paddingTop: 10,
                        paddingHorizontal: 10
                    }}>
                        <Text style={{
                            fontWeight: "bold"
                        }}>Mulberry</Text>
                        <Text style={{
                            fontWeight: "bold",
                            color: "#00a46c",
                            paddingLeft: 35
                        }}>Value</Text>
                    </View>
                    <Text style={{
                        paddingHorizontal: 10,
                        fontWeight: "bold",
                        color: "#b1e5d3",
                        paddingTop: 3
                    }}>
                        Street Name
                    </Text>
                </TouchableOpacity>

                <View
                    // onPress={()=>navigation.navigate("Detail")}
                    style={{
                        height: 250,
                        elevation: 2,
                        backgroundColor: "#FFF",
                        marginLeft: 20,
                        marginTop: 20,
                        borderRadius: 15,
                        marginBottom: 10,
                        width: 160
                    }}
                >
                    <Image
                        source={require('../assets/images/plant1.png')}
                    />
                    <View style={{
                        flexDirection: "row",
                        paddingTop: 10,
                        paddingHorizontal: 10
                    }}>
                        <Text style={{
                            fontWeight: "bold"
                        }}>Orange</Text>
                        <Text style={{
                            fontWeight: "bold",
                            color: "#00a46c",
                            paddingLeft: 45
                        }}>Value</Text>
                    </View>
                    <Text style={{
                        paddingHorizontal: 10,
                        fontWeight: "bold",
                        color: "#b1e5d3",
                        paddingTop: 3
                    }}>
                        Street Name
                        </Text>
                </View>

                <View
                    // onPress={()=>navigation.navigate("Detail")}
                    style={{
                        height: 250,
                        elevation: 2,
                        backgroundColor: "#FFF",
                        marginLeft: 20,
                        marginTop: 20,
                        borderRadius: 15,
                        marginBottom: 10,
                        width: 160
                    }}
                >
                    <Image
                        source={require('../assets/images/plant1.png')}
                    />
                    <View style={{
                        flexDirection: "row",
                        paddingTop: 10,
                        paddingHorizontal: 10
                    }}>
                        <Text style={{
                            fontWeight: "bold"
                        }}>Apple</Text>
                        <Text style={{
                            fontWeight: "bold",
                            color: "#00a46c",
                            paddingLeft: 35
                        }}>$400</Text>
                    </View>
                    <Text style={{
                        paddingHorizontal: 10,
                        fontWeight: "bold",
                        color: "#b1e5d3",
                        paddingTop: 3
                    }}>
                        Street Name
                    </Text>
                </View>

            </ScrollView>
        </View>
    )
}
export default Explore;