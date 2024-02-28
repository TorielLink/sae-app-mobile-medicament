import * as React from 'react';
import {Button, Modal, Text} from 'react-native-paper';
import {StyleSheet, View} from "react-native";

export default function SelectionDrugs({hide, onOK}) {
    return (
        <Modal
            visible={true}
            contentContainerStyle={styles.modalContainerStyle}
            onDismiss={() => {
                hide();
            }}>
            <View style={styles.modalContent}>
                <Text>Modification de mes médicaments</Text>
                <Text>plein de choses super ici</Text>{/*TODO*/}
                <Button
                    onPress={onOK()}>
                    <Text>Valider</Text>
                </Button>
                <Button
                    onPress={() => {
                        hide();
                    }}>
                    <Text>Annuler</Text>
                </Button>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainerStyle: {
        alignItems: 'center',
        backgroundColor: 'grey',
        padding: 20,
        borderRadius: 10
    },
    modalContent: {
        maxWidth: 400,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    }
});