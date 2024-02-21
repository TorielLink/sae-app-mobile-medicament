import React, {useState} from 'react';
import {View, Text, StyleSheet, Linking, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {assertConfigFileSearch} from "@babel/core/lib/config/validation/option-assertions";

const Screen2 = () => {
    const contactUs = () => {
        Linking.openURL('mailto:service.technique@AppMobile.com');//TODO
    };
    const [userConnected, setUserConnected] = useState(false);//TODO initial state
    const [titleText, setTitleText] = useState("Compte utilisateur");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passwordUser, setPasswordUser] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(false);
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

                {(!userConnected && !showLoginForm) && <Button icon="lan-connect" mode="contained" onPress={connectProfile} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                    Me connecter
                </Button>}

                {showLoginForm &&
                    <View>
                        <TextInput
                            label="Prénom"
                            value={firstName}
                            onChangeText={text => setFirstName(text)}
                        />
                        <TextInput
                            label="Mot de passe"
                            value={passwordUser}
                            onChangeText={text => setPasswordUser(text)}
                            secureTextEntry={true}
                        />
                        <Button icon="chevron-right-circle-outline" mode="contained" onPress={submitLoginForm} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                            Valider
                        </Button>
                    </View>}

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
        setShowLoginForm(true);
    }

    function submitLoginForm() {
        fetch('http://localhost:3000/login', {//TODO MODIF
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                passwordUser: passwordUser,
            }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            if(data.length === 0){
                Alert.alert('Mauvais identifiants');
            }
            else {
                setTitleText("Bienvenue " + firstName + ' ' + lastName);
                setUserConnected(true);
            }
            setShowLoginForm(false);
        })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
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
