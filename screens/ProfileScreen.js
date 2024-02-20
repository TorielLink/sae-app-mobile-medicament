import React, {useState} from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import { Button } from 'react-native-paper';

const Screen2 = () => {
    const contactUs = () => {
        Linking.openURL('mailto:service.technique@AppMobile.com');//TODO
    };
    const [userConnected, setUserConnected] = useState(false);//TODO initial state
    const [titleText, setTitleText] = useState("Compte utilisateur");
    return (
        <View style={styles.screen}>
            <Text id={"UserProfileTitle"} style={styles.title}>{titleText}</Text>
            <View style={{ flexDirection: 'column' }}>
                {userConnected &&
                    <View>
                        <Button icon="account-edit" mode="contained" onPress={changeProfileInfos} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                            Modifier mes informations
                        </Button>
                        <Button icon="pill" mode="contained" onPress={changePills} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                            Mes médicaments
                        </Button>
                    </View>}

                {!userConnected && <Button icon="lan-connect" mode="contained" onPress={connectProfile} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                    Me connecter
                </Button>}

                <Button icon="human-greeting-proximity" mode="contained" onPress={contactUs} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                    Nous contacter
                </Button>

                {userConnected &&
                    <View>
                        <Button icon="lan-disconnect" mode="contained" onPress={disconnectProfile} buttonColor={"#BC2C2C"} style={styles.buttonStyle}>
                            Me déconnecter
                        </Button>
                        <Button icon="delete-forever" mode="contained" onPress={deleteProfile} buttonColor={"#BC2C2C"} style={styles.buttonStyle}>
                            Supprimer mon compte
                        </Button>
                    </View>}

            </View>
        </View>
    );

    function changeProfileInfos() {
        //TODO popup
    }

    function changePills() {
        //TODO
    }

    function disconnectProfile() {
        //TODO
        setUserConnected(false);
        setTitleText("Compte utilisateur");
    }

    function connectProfile() {
        let userName = "Rémi";
        //TODO
        setUserConnected(true);
        setTitleText("Bienvenue " + userName);
    }

    function deleteProfile() {
        //TODO confirmation + delete cascade on BD (maybe svg before ?)
    }
};

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        marginTop: 20,
        marginBottom: 30,
    },
    buttonStyle: {
        marginBottom: 10,
    }
});

export default Screen2;
