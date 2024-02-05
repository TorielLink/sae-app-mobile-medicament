import React from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import { Button } from 'react-native-paper';

const Screen2 = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Compte utilisateur</Text>
            <View style={{ flexDirection: 'column' }}>
            <Button icon="account-edit" mode="contained" onPress={changeProfileInfos} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                Modifier mes informations
            </Button>
            <Button icon="pill" mode="contained" onPress={changePills} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                Mes médicaments
            </Button>
            <Button icon="human-greeting-proximity" mode="contained" onPress={contactUs} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                Nous contacter
            </Button>
            <Button icon="lan-disconnect" mode="contained" onPress={disconnectProfile} buttonColor={"#BC2C2C"} style={styles.buttonStyle}>
                Me déconnecter
            </Button>
            <Button icon="delete-forever" mode="contained" onPress={deleteProfile} buttonColor={"#BC2C2C"} style={styles.buttonStyle}>
                Supprimer mon compte
            </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        marginTop: 20,
        marginBottom: 30,
        fontFamily: 'Goudy Bookletter 1911", sans-serif',
    },
    buttonStyle: {
        marginBottom: 10,
    }
});

export default Screen2;

function changeProfileInfos() {
    //TODO
}

function changePills() {
    //TODO
}

function disconnectProfile() {
    //TODO
}

function deleteProfile() {
    //TODO
}