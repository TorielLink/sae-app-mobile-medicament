import React, {useState} from 'react';
import {View, Text, StyleSheet, Linking, Alert, Platform} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import SelectionDrugs from "../components/SelectionDrugs";

const SERVER_ADDRESS = 'https://remi-lem.alwaysdata.net/saeGestionMedicaments'; //TODO modifier si besoin
const MIN_LENGTH_PASSWORD_USER = 5;
const MIN_LENGTH_NAME_USER = 1;

const Screen2 = () => {
    const contactUs = () => {
        Linking.openURL('mailto:service.technique@AppMobile.com?subject=Contact via application'); //TODO
    };
    const [userConnected, setUserConnected] = useState(false);//TODO connection automatique
    const [creatingUser, setCreatingUser] = useState(false);

    const [titleText, setTitleText] = useState("Compte utilisateur");

    const [idUser, setIdUser] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passwordUser, setPasswordUser] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [showDrugsModif, setDrugsModifVisibility] = useState(false);

    return (
        <View>
            <View style={styles.screen}>
                <Text id={"UserProfileTitle"} style={styles.title}>{titleText}</Text>
                <View style={{ flexDirection: 'column' }}>
                    {userConnected &&
                        <View>
                            <Button icon="account-edit" mode="contained" onPress={changeProfileInfos} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                                Modifier mes informations
                            </Button>
                            <Button icon="pill" mode="contained" onPress={() => setDrugsModifVisibility(true)} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                                Mes médicaments
                            </Button>
                        </View>}

                    {(!userConnected && !showForm) && <Button icon="login" mode="contained" onPress={connectProfile} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                        Me connecter
                    </Button>}

                    {(!userConnected && !showForm) && <Button icon="account-plus-outline" mode="contained" onPress={createProfile} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                        Créer un compte
                    </Button>}

                    {showForm &&
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
                            <Button icon="chevron-right-circle-outline" mode="contained" onPress={(creatingUser ? submitCreateUserForm : submitLoginForm)/*TODO voir si ca plante pas ici*/} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                                Valider
                            </Button>
                            <Button icon="close-circle-outline" mode="contained" onPress={cancelForm} buttonColor={"#BC2C2C"} style={styles.buttonStyle}>
                                Annuler
                            </Button>
                        </View>}

                    <Button icon="human-greeting-proximity" mode="contained" onPress={contactUs} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                        Nous contacter
                    </Button>

                    {userConnected &&
                        <View>
                            <Button icon="logout" mode="contained" onPress={disconnectProfile} buttonColor={"#BC2C2C"} style={styles.buttonStyle}>
                                Me déconnecter
                            </Button>
                            <Button icon="delete-forever" mode="contained" onPress={deleteProfile} buttonColor={"#BC2C2C"} style={styles.buttonStyle}>
                                Supprimer mon compte
                            </Button>
                        </View>}

                </View>
            </View>
            {userConnected && showDrugsModif &&
                <SelectionDrugs hide={() => {setDrugsModifVisibility(false);}}
                                getIdUser={() => {return idUser}}
                                SERVER_ADDRESS={SERVER_ADDRESS}
                />
            }
        </View>
    );

    function changeProfileInfos() {
        Alert.prompt(//TODO rendre cross platform !!
            'Modifier mes informations',
            'Entrez vos nouvelles informations :',
            [
                {
                    text: 'Annuler',
                    style: 'cancel',
                },
                {
                    text: 'Valider',
                    onPress: (newInfo) => updateProfile(newInfo),
                },
            ],
            'plain-text'
        );
    }

    function updateProfile(newInfo) {
        // Traitez les nouvelles infos
        //TODO
        showAlert(`Informations mises à jour : ${newInfo}`);
    }

    function disconnectProfile() {
        setIdUser(null);
        setFirstName('');
        setLastName('');
        setPasswordUser('');
        setUserConnected(false);
        setTitleText("Compte utilisateur");
    }

    function createProfile() {
        setTitleText("Création de compte");
        setCreatingUser(true);
        setShowForm(true);
    }

    function connectProfile() {
        setTitleText("Connexion");
        setCreatingUser(false);
        setShowForm(true);
    }

    function submitLoginForm() {
        if(!sizeFormInputOK()){
            showAlert("Champs trop courts. Merci de vérifier vos informations");
            return;
        }
        fetch(SERVER_ADDRESS + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                passwordUser: passwordUser,
            }),
        }).then(response => {
            if (!response.ok) {
                showAlert('Erreur du serveur')
            }
            else {
                return response.json();
            }
        }).then(data => {
            if(data.length === 0){
                showAlert('Mauvais identifiants')
            }
            else {
                setTitleText("Bienvenue " + firstName + ' ' + lastName);
                setIdUser(data[0].Id_Utilisateur);
                setUserConnected(true);
            }
            setShowForm(false);
        })
            .catch(error => {
                showAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ')');
            });
        setPasswordUser('');
    }

    function submitCreateUserForm() {
        if(!sizeFormInputOK()){
            showAlert("Champs trop courts. (MDP > 5 caractères)");
            return;
        }
        fetch(SERVER_ADDRESS + '/createAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                passwordUser: passwordUser,
            }),
        }).then(response => {
            if (!response.ok) {
                showAlert('Erreur du serveur')
            }
            else {
                return response.json();
            }
        }).then(data => {
            showAlert('Compte crée avec succès')
            setTitleText("Compte utilisateur");
            setShowForm(false);
        })
            .catch(error => {
                showAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ')');
            });
        setPasswordUser('');
    }

    function cancelForm() {
        setFirstName('');
        setLastName('');
        setPasswordUser('');
        setShowForm(false)
        setTitleText("Compte utilisateur");
    }

    function showAlert(message){
        if(Platform.OS === 'web'){
            alert(message)
        }
        else {
            Alert.alert(message);
        }
    }

    function sizeFormInputOK() {
        return !(firstName.length < MIN_LENGTH_NAME_USER || lastName.length < MIN_LENGTH_NAME_USER || passwordUser.length < MIN_LENGTH_PASSWORD_USER);
    }

    function deleteProfile() {
        Alert.alert('Suppression de compte', 'Êtes vous sur de vouloir supprimer votre copte ?', [
            //TODO generaliser l'alerte (ne marche pas pour le web)
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
            }
            else {
                return response;
            }
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
        height : "93%"//TODO trouver mieux pour que le modal des drugs prenne toute la page
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
