import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SERVER_ADDRESS } from "../constants/constants";
import AdaptativeAlert from "./AdaptativeAlert";
import {List} from "react-native-paper";

export default function LatestSignalementsList({handleSignaledCIPPress}) {
    const [signalements, setSignalements] = useState([]);

    useEffect(() => {
        fetchSignalements();
    }, []);

    const fetchSignalements = () => {
        fetch(SERVER_ADDRESS + '/getSignalements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).then(response => {
            if (!response.ok) {
                AdaptativeAlert('Erreur du serveur');
            } else {
                return response.json();
            }
        }).then(data => {
            const latestSignalements = data.slice(0, 5);
            setSignalements(latestSignalements);
        }).catch(() => {
            AdaptativeAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ')');
        });
    };

    return (
        <View style={styles.containerStyle}>
            <Text>Derniers médicaments signalés :</Text>
            <Text>Cliquez sur un médicament pour le signaler à votre tour</Text>
            <List.Section style={styles.list}>
                {signalements.length > 0 && signalements.map((item, index) => (
                    <List.Item
                        style={styles.item}
                        key={index}
                        title={item.Denomination}
                        description={item.Code_CIS}
                        onPress={() => {
                            handleSignaledCIPPress(item.Code_CIS)
                        }}
                    />
                ))}
            </List.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        padding: 10,
    },
    list: {
        paddingTop: 25,
    },
    item: {
        backgroundColor: '#7DAE32',
        padding: 15,
    },
});