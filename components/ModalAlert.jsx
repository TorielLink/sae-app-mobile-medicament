import React from 'react';
import { Platform, View, Alert } from 'react-native';
import { Modal, Text, Button as PaperButton, Portal } from 'react-native-paper';

const ModalAlert = ({ title, message, buttons }) => {
    if (Platform.OS === 'web') {
        Alert.alert(title, message, buttons);
        return null;
    } else {
        return (
            <Portal>
                <Modal visible={true} onDismiss={() => {}}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{title}</Text>
                        <Text>{message}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                            {buttons.map((button, index) => (
                                <PaperButton key={index} mode="outlined" onPress={button.onPress}>{button.text}</PaperButton>
                            ))}
                        </View>
                    </View>
                </Modal>
            </Portal>
        );
    }
};

export default ModalAlert;