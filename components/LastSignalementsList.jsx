import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SERVER_ADDRESS } from "../constants/constants";
import AdaptativeAlert from "./AdaptativeAlert";

const LatestSignalementsList = () => {
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

    const renderSignalementItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.Denomination}</Text>
            <Text>{item.Code_CIS}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text>Derniers médicaments signalés :</Text>
            <FlatList style={styles.list}
                data={signalements}
                renderItem={renderSignalementItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    list: {
        paddingTop: 25,
    },
    item: {
        backgroundColor: '#E4F2CF',
        padding: 15,
    },
});

export default LatestSignalementsList;