import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Button} from "react-native-paper";

const GDPRConsent = ({ onAccept, onDecline }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Nous utilisons des cookies pour améliorer votre expérience. Acceptez-vous notre politique de confidentialité ?
            </Text>
            <View style={styles.buttonContainer}>
                <Button onPress={onAccept} buttonColor={"#7DAE32"} mode="contained" style={styles.buttonStyle}>Accepter</Button>
                <Button onPress={onDecline} buttonColor={"#7DAE32"} mode="contained" style={styles.buttonStyle} >Refuser</Button>
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
    buttonStyle: {

    }
});

export default GDPRConsent;
