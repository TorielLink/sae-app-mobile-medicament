import React, {useState} from 'react';
import {View, Text, StyleSheet, Linking, Alert, Platform} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

const SERVER_ADDRESS = 'http://192.168.0.3:3000'; //TODO modifier

const Screen2 = () => {
    const contactUs = () => {
        Linking.openURL('mailto:service.technique@AppMobile.com');//TODO
    };
    const [userConnected, setUserConnected] = useState(false);//TODO connection automatique
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
                            label="Nom de famille"
                            value={lastName}
                            onChangeText={text => setLastName(text)}
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
        setFirstName('');
        setLastName('');
        setPasswordUser('');
        setUserConnected(false);
        setTitleText("Compte utilisateur");
    }

    function connectProfile() {
        setShowLoginForm(true);
    }

    function submitLoginForm() {
        fetch(SERVER_ADDRESS + '/login', {
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
                showAlert('Erreur du serveur')
            }
            return response.json();
        }).then(data => {
            if(data.length === 0){
                showAlert('Mauvais identifiants')
            }
            else {
                setTitleText("Bienvenue " + firstName + ' ' + lastName);
                setUserConnected(true);
            }
            setShowLoginForm(false);
        })
            .catch(error => {
                showAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ')');
            });
    }

    function showAlert(message){
        if(Platform.OS === 'web'){
            alert(message)
        }
        else {
            Alert.alert(message);
        }
    }

    function deleteProfile() {
        Alert.alert('Suppression de compte', 'Êtes vous sur de vouloir supprimer votre copte ?', [
            //TODO generaliser l'alerte
            {
                text: 'Annuler',
                style: 'cancel',
            },
            {
                cancelable: true,
            },
            {
                text: 'OK', onPress: deleteProfileConfirmed
            }
        ]);
    }

    function deleteProfileConfirmed() {
        fetch(SERVER_ADDRESS + '/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName
            }),
        }).then(response => {
            if (!response.ok) {
                showAlert('Erreur du serveur');
                return;
            }
            return response;
        }).then(data => {
            if(data.text() === "ERROR"){
                showAlert('Erreur de suppression');
            }
            else {
                showAlert('Compte supprimé');
                disconnectProfile();
            }
        })
            .catch(error => {
                showAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ', erreur : ' + error + ')');
            });
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
