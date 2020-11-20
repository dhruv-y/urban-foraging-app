import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"

export default function CommentsModal({ navigation }) {
    const [modalOpen, setModalOpen] = useState(true);

    return (
        <Modal visible={modalOpen} animationType='slide' >
            <View style={styles.modalContent}>
                <MaterialIcons
                    name={"close"}
                    size={30}
                    onPress={() => setModalOpen(false)}
                    style={styles.modalToggle}
                />
                <Login />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
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
