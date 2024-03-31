import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GDPRConsent = ({ onAccept, onDecline }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Nous utilisons des cookies pour améliorer votre expérience. Acceptez-vous notre politique de confidentialité ?
            </Text>
            <View style={styles.buttonContainer}>
                <Button title="Accepter" onPress={onAccept} />
                <Button title="Refuser" onPress={onDecline} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        margin: 20,
    },
    text: {
        marginBottom: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default GDPRConsent;
