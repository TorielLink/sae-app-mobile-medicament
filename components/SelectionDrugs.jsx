import * as React from 'react';
import {Button, Modal, Text} from 'react-native-paper';
import {StyleSheet, View} from "react-native";

export default function SelectionDrugs({isVisible, setVisibility, onOK}) {
    return (
        <Modal
            visible={isVisible}
            contentContainerStyle={styles.modal}
            onDismiss={() => {setVisibility(false)}}>
            <View style={styles.modalContent}>
                <Text>Modification de mes médicaments</Text>
                <Text>plein de choses super ici</Text>{/*TODO*/}
                <Button
                    onPress={onOK}>
                    <Text>Valider</Text>
                </Button>
                <Button
                    onPress={() => setVisibility(false)}>
                    <Text>Annuler</Text>
                </Button>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'grey',
        padding: 20,
        borderRadius: 10,
    },
    modalContent: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    }
});