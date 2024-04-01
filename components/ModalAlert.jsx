import React from 'react';
import {View} from 'react-native';
import { Modal, Portal, Text, Button as PaperButton } from 'react-native-paper';

export default function ModalAlert({ title, message, buttons }) {
    return (
        <Portal>
            <Modal visible={true} contentContainerStyle={{ backgroundColor: 'white', padding: 20, borderRadius: 10,
                elevation: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{title}</Text>
                <Text>{message}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                    {buttons.map((button, index) => (
                        <PaperButton key={index} mode="outlined" onPress={button.onPress}>{button.text}</PaperButton>
                        ))}
                </View>
            </Modal>
        </Portal>
    );
};