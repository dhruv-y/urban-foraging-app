import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, Button, Platform, Modal } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"

export default function TreeCard() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <View styel={styles.modalContent}>
            <Modal visible={modalOpen} animationType='slide' >
                <View style={styles.modalContent}>
                    <MaterialIcons
                        name={"close"}
                        size={30}
                        onPress={() => setModalOpen(false)}
                        style={styles.modalToggle}
                    />
                    <Text>Here!</Text>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
    },
    modalToggle: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalContent: {
        flex: 1,
    },
});