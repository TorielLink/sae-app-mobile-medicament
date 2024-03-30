import React, { useState } from "react";
import { Modal, Portal, TextInput, Button } from "react-native-paper";
import { View } from "react-native";
import {SERVER_ADDRESS} from "../constants/constants";
import AdaptativeAlert from "./AdaptativeAlert";

export default function ChangeProfileInfos({ hideMe, idUser }) {
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleConfirm = () => {
        fetch(SERVER_ADDRESS + '/updateProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUser: idUser,
                firstName: newFirstName,
                lastName: newLastName,
                password: newPassword
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur du serveur');
                } else {
                    AdaptativeAlert(`Informations mises à jour.`);
                }
            })
            .catch(error => {
                AdaptativeAlert(`Erreur lors de la mise à jour du profil : ${error}`);
            });
        hideMe();
    };

    const handleCancel = () => {
        hideMe();
    };

    return (
        <Portal>
            <Modal
                visible={true}
                contentContainerStyle={styles.modalContainerStyle}
                onDismiss={() => {
                    hideMe();
                }}
            >
                <View style={styles.modalContent}>
                    <TextInput
                        label="Nouveau prénom"
                        value={newFirstName}
                        onChangeText={text => setNewFirstName(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label="Nouveau nom"
                        value={newLastName}
                        onChangeText={text => setNewLastName(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label="Nouveau mot de passe"
                        value={newPassword}
                        onChangeText={text => setNewPassword(text)}
                        secureTextEntry
                        style={styles.input}
                    />
                    <Button mode="contained" onPress={handleConfirm} style={styles.button}>
                        Valider
                    </Button>
                    <Button mode="outlined" onPress={handleCancel} style={styles.button}>
                        Annuler
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
}

const styles = {
    modalContainerStyle: {
        backgroundColor: "white",
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    modalContent: {
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        marginBottom: 10,
        width: "100%",
    },
    button: {
        marginTop: 10,
        width: "100%",
    },
};
