import React, {useEffect, useState} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

import SelectionDrugs from "../components/SelectionDrugs";
import AdaptativeAlert from "../components/AdaptativeAlert";
import ModalAlert from '../components/ModalAlert';
import AdminSignalementsList from "../components/AdminSignalementsList";
//import AdminPanel from "../components/AdminPanel";
import ChangeProfileInfos from "../components/ChangeProfileInfos";

import {MIN_LENGTH_NAME_USER, MIN_LENGTH_PASSWORD_USER, SERVER_ADDRESS} from "../constants/constants";
import {useUserContext} from "../contexts/UserContext";

export default function ProfileScreen() {
    const contactUs = () => {
        Linking.openURL("mailto:service.technique@AppMobile.com?subject=Remarques sur l'application");
    };
    const [userConnected, setUserConnected] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);
    const [changingProfileInfos, setChangingProfileInfos] = useState(false);
    const [deletingProfile, setDeletingProfile] = useState(false);

    const [titleText, setTitleText] = useState("Compte utilisateur");

    const [idUser, setIdUser] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passwordUser, setPasswordUser] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [showDrugsModif, setDrugsModifVisibility] = useState(false);
    const [showAdminPanel, setAdminPanelVisibility] = useState(false);

    const { storeUserId } = useUserContext();

    useEffect(() => {
        Promise.all([
            AsyncStorage.getItem('userFirstName'),
            AsyncStorage.getItem('userLastName'),
            AsyncStorage.getItem('userPassword')
        ])
            .then(([firstName, lastName, password]) => {
                if (firstName) {
                    setFirstName(firstName);
                }
                if (lastName) {
                    setLastName(lastName);
                }
                if (password) {
                    setPasswordUser(password);
                }
                if(sizeFormInputOK()){
                    submitLoginForm();
                }
            })
            .catch(() => {});
    }, []);


    return (
        <View>
            <View style={styles.screen}>
                <Text id={"UserProfileTitle"} style={styles.title}>{titleText}</Text>
                <View style={styles.buttonsProfile}>
                    {userConnected &&
                        <>
                            <Button
                                icon="account-edit"
                                mode="contained"
                                onPress={() => setChangingProfileInfos(true)}
                                buttonColor={"#7DAE32"}
                                style={styles.buttonStyle}>
                                Modifier mes informations
                            </Button>
                            <Button
                                icon="pill"
                                mode="contained"
                                onPress={() => setDrugsModifVisibility(true)}
                                buttonColor={"#7DAE32"}
                                style={styles.buttonStyle}>
                                Mes médicaments
                            </Button>
                        </>}

                    {(!userConnected && !showForm) &&
                        <Button
                            icon="login"
                            mode="contained"
                            onPress={connectProfile}
                            buttonColor={"#7DAE32"}
                            style={styles.buttonStyle}>
                            Me connecter
                        </Button>
                    }

                    {(!userConnected && !showForm) && <Button icon="account-plus-outline" mode="contained"
                                                              onPress={createProfile} buttonColor={"#7DAE32"}
                                                              style={styles.buttonStyle}>
                        Créer un compte
                    </Button>}

                    {showForm &&
                        <>
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
                            <Button icon="chevron-right-circle-outline" mode="contained" onPress={
                                (creatingUser ? submitCreateUserForm : submitLoginForm)
                            } buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                                Valider
                            </Button>
                            <Button icon="close-circle-outline" mode="contained" onPress={cancelForm}
                                    buttonColor={"#BC2C2C"} style={styles.buttonStyle}>
                                Annuler
                            </Button>
                        </>}

                    <Button icon="human-greeting-proximity" mode="contained" onPress={contactUs} buttonColor={"#7DAE32"}
                            style={styles.buttonStyle}>
                        Nous contacter
                    </Button>

                    {userConnected &&
                        <>
                            <Button icon="logout" mode="contained" onPress={disconnectProfile} buttonColor={"#BC2C2C"}
                                    style={styles.buttonStyle}>
                                Me déconnecter
                            </Button>
                            <Button icon="delete-forever" mode="contained" onPress={deleteProfile} buttonColor={"#BC2C2C"}
                                    style={styles.buttonStyle}>
                                Supprimer mon compte
                            </Button>
                        </>}
                    {isAdmin &&
                        <Button icon="security" mode="contained" onPress={() => setAdminPanelVisibility(true)} buttonColor={"#A68A64"}
                                style={styles.buttonStyle}>
                            Panneau d'administration
                        </Button>
                    }
                </View>
            </View>

            {isAdmin && showAdminPanel &&
                <>
                    <AdminSignalementsList hideMe={() => {setAdminPanelVisibility(false);}}/>
                    {/*<AdminPanel hideMe={() => {setAdminPanelVisibility(false);}}/>*/}
                </>
                }
            {userConnected && showDrugsModif &&
                <SelectionDrugs hideMe={() => {setDrugsModifVisibility(false);}} getIdUser={
                    () => {return idUser}}/>}
            {userConnected && changingProfileInfos &&
                <ChangeProfileInfos hideMe={() => setChangingProfileInfos(false)} idUser={idUser} />}
            {userConnected && deletingProfile &&
                <ModalAlert
                    title="Suppression de compte"
                    message="Êtes vous sur de vouloir supprimer votre compte ?"
                    buttons={[
                        {
                            text: 'Annuler',
                            style: 'cancel',
                            onPress: () => setDeletingProfile(false)
                        },
                        {
                            text: 'OK',
                            onPress: deleteProfileConfirmed,
                        },
                    ]}
                />}
        </View>
    );

    function disconnectProfile() {
        setIdUser(null);
        setFirstName('');
        setLastName('');
        setPasswordUser('');
        setIsAdmin(false);
        setUserConnected(false);
        setTitleText("Compte utilisateur");
        storeUserId(null);

        AsyncStorage.setItem('userFirstName', '').then(() => {})
        AsyncStorage.setItem('userLastName', '').then(() => {})
        AsyncStorage.setItem('userPassword', '').then(() => {})
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
            AdaptativeAlert("Champs trop courts. Merci de vérifier vos informations");
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
                AdaptativeAlert('Erreur du serveur')
            }
            else {
                return response.json();
            }
        }).then(data => {
            if(data.length === 0){
                AdaptativeAlert('Mauvais identifiants')
            }
            else {
                setTitleText("Bienvenue " + firstName + ' ' + lastName);
                setIdUser(data[0].Id_Utilisateur);
                setIsAdmin(data[0].Admin === 1)
                setUserConnected(true);
                storeUserId(data[0].Id_Utilisateur);

                AsyncStorage.setItem('userFirstName', firstName).then(() => {})
                AsyncStorage.setItem('userLastName', lastName).then(() => {})
                AsyncStorage.setItem('userPassword', passwordUser).then(() => {})
            }
            setShowForm(false);
        })
            .catch(() => {
                AdaptativeAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ')');
            });
        setPasswordUser('');
    }

    function submitCreateUserForm() {
        if(!sizeFormInputOK()){
            AdaptativeAlert("Champs trop courts. (MDP > 5 caractères)");
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
                AdaptativeAlert('Erreur du serveur')
            }
            else {
                return response.json();
            }
        }).then(() => {
            AdaptativeAlert('Compte crée avec succès')
            setTitleText("Compte utilisateur");
            setShowForm(false);
        })
            .catch(() => {
                AdaptativeAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ')');
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

    function sizeFormInputOK() {
        if(firstName.length < MIN_LENGTH_NAME_USER){
            return false;
        }
        if(lastName.length < MIN_LENGTH_NAME_USER){
            return false;
        }
        if(passwordUser.length < MIN_LENGTH_PASSWORD_USER){
            return false;
        }
        return true;
    }

    function deleteProfile() {
        setDeletingProfile(true);
    }

    function deleteProfileConfirmed() {
        setDeletingProfile(false)
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
                AdaptativeAlert('Erreur du serveur');
            }
            else {
                return response;
            }
        }).then(data => {
            if(data.text() === "ERROR"){
                AdaptativeAlert('Erreur de suppression');
            }
            else {
                AdaptativeAlert('Compte supprimé');
                disconnectProfile();
            }
        })
            .catch(error => {
                AdaptativeAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ', erreur : ' + error + ')');
            });
    }
};

const styles = StyleSheet.create({
    screen: {

    },
    buttonsProfile: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 20,
        marginBottom: 30,
    },
    buttonStyle: {
        marginTop: 10,
    }
});