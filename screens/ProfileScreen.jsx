import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Linking, Alert, Platform, Picker } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import SelectionDrugs from "../components/SelectionDrugs";
import { useTranslation } from 'react-i18next';
import { i18n } from 'react-i18next';

import lang_en from '../translations/en.json';
import lang_fr from '../translations/fr.json';
import lang_es from '../translations/es.json';
import lang_de from '../translations/de.json';

const SERVER_ADDRESS = 'https://remi-lem.alwaysdata.net/saeGestionMedicaments';
const MIN_LENGTH_PASSWORD_USER = 5;
const MIN_LENGTH_NAME_USER = 1;

const ProfileScreen = () => {
    const { t } = useTranslation();

    const contactUs = () => {
        Linking.openURL('mailto:service.technique@AppMobile.com?subject=Contact via application');
    };
    const [userConnected, setUserConnected] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    useEffect(() => {
        i18n.changeLanguage(selectedLanguage);
    }, [selectedLanguage]);

    const [titleText, setTitleText] = useState(i18n.t('profileScreen.userAccount')); // Utiliser i18n.t pour traduire la chaîne

    const [idUser, setIdUser] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passwordUser, setPasswordUser] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [showDrugsModif, setDrugsModifVisibility] = useState(false);

    const changeLanguage = (language) => {
        setSelectedLanguage(language);
    };

    return (
        <View>
            <View style={styles.screen}>
                <Text id={"UserProfileTitle"} style={styles.title}>{titleText}</Text>
                <Picker
                    selectedValue={selectedLanguage}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => changeLanguage(itemValue)}
                >
                    <Picker.Item label="English" value="en" />
                    <Picker.Item label="Français" value="fr" />
                    <Picker.Item label="Español" value="es" />
                    <Picker.Item label="Deutsch" value="de" />
                </Picker>
                <View style={{ flexDirection: 'column' }}>
                    {userConnected &&
                        <View>
                            <Button icon="account-edit" mode="contained" onPress={changeProfileInfos} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                                {i18n.t('profileScreen.modifyInfos')} {/* Utiliser i18n.t pour traduire la chaîne */}
                            </Button>
                            <Button icon="pill" mode="contained" onPress={() => setDrugsModifVisibility(true)} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                                {i18n.t('profileScreen.myDrugs')} {/* Utiliser i18n.t pour traduire la chaîne */}
                            </Button>
                        </View>}

                    {(!userConnected && !showForm) && <Button icon="login" mode="contained" onPress={connectProfile} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                        {i18n.t('profileScreen.signIn')} {/* Utiliser i18n.t pour traduire la chaîne */}
                    </Button>}

                    {(!userConnected && !showForm) && <Button icon="account-plus-outline" mode="contained" onPress={createProfile} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                        {i18n.t('profileScreen.createAccount')} {/* Utiliser i18n.t pour traduire la chaîne */}
                    </Button>}

                    {showForm &&
                        <View>
                            <TextInput
                                label={i18n.t('profileScreen.firstName')} {/* Utiliser i18n.t pour traduire la chaîne */}
                                value={firstName}
                                onChangeText={text => setFirstName(text)}
                            />
                            <TextInput
                                label={i18n.t('profileScreen.lastName')} {/* Utiliser i18n.t pour traduire la chaîne */}
                                value={lastName}
                                onChangeText={text => setLastName(text)}
                            />
                            <TextInput
                                label={i18n.t('profileScreen.password')} {/* Utiliser i18n.t pour traduire la chaîne */}
                                value={passwordUser}
                                onChangeText={text => setPasswordUser(text)}
                                secureTextEntry={true}
                            />
                            <Button icon="chevron-right-circle-outline" mode="contained" onPress={(creatingUser ? submitCreateUserForm : submitLoginForm)} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                                {i18n.t('profileScreen.validate')} {/* Utiliser i18n.t pour traduire la chaîne */}
                            </Button>
                            <Button icon="close-circle-outline" mode="contained" onPress={cancelForm} buttonColor={"#BC2C2C"} style={styles.buttonStyle}>
                                {i18n.t('profileScreen.cancel')} {/* Utiliser i18n.t pour traduire la chaîne */}
                            </Button>
                        </View>}

                    <Button icon="human-greeting-proximity" mode="contained" onPress={contactUs} buttonColor={"#7DAE32"} style={styles.buttonStyle}>
                        {i18n.t('profileScreen.contactUs')} {/* Utiliser i18n.t pour traduire la chaîne */}
                    </Button>

                    {userConnected &&
                        <View>
                            <Button icon="logout" mode="contained" onPress={disconnectProfile} buttonColor={"#BC2C2C"} style={styles.buttonStyle}>
                                {i18n.t('profileScreen.signOut')} {/* Utiliser i18n.t pour traduire la chaîne */}
                            </Button>
                            <Button icon="delete-forever" mode="contained" onPress={deleteProfile} buttonColor={"#BC2C2C"} style={styles.buttonStyle}>
                                {i18n.t('profileScreen.deleteAccount')} {/* Utiliser i18n.t pour traduire la chaîne */}
                            </Button>
                        </View>}

                </View>
            </View>
            {userConnected && showDrugsModif &&
                <SelectionDrugs hide={() => { setDrugsModifVisibility(false); }}
                                getIdUser={() => { return idUser }}
                                SERVER_ADDRESS={SERVER_ADDRESS}
                />
            }
        </View>
    );

    function changeProfileInfos() {
        Alert.prompt(
            t('profileScreen.modifyInfosTitle'),
            t('profileScreen.modifyInfosPrompt'),
            [
                {
                    text: t('profileScreen.cancel'),
                    style: 'cancel',
                },
                {
                    text: t('profileScreen.validate'),
                    onPress: (newInfo) => updateProfile(newInfo),
                },
            ],
            'plain-text'
        );
    }

    function updateProfile(newInfo) {
        showAlert(`${t('profileScreen.updatedInfo')} ${newInfo}`);
    }

    function disconnectProfile() {
        setIdUser(null);
        setFirstName('');
        setLastName('');
        setPasswordUser('');
        setUserConnected(false);
        setTitleText(t('profileScreen.userAccount'));
    }

    function createProfile() {
        setTitleText(t('profileScreen.createAccountTitle'));
        setCreatingUser(true);
        setShowForm(true);
    }

    function connectProfile() {
        setTitleText(t('profileScreen.signInTitle'));
        setCreatingUser(false);
        setShowForm(true);
    }

    function submitLoginForm() {
        if(!sizeFormInputOK()){
            showAlert(t('profileScreen.fieldsTooShort'));
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
                showAlert(t('profileScreen.serverError'));
            }
            else {
                return response.json();
            }
        }).then(data => {
            if(data.length === 0){
                showAlert(t('profileScreen.badCredentials'));
            }
            else {
                setTitleText(t('profileScreen.welcome') + ' ' + firstName + ' ' + lastName);
                setIdUser(data[0].Id_Utilisateur);
                setUserConnected(true);
            }
            setShowForm(false);
        })
            .catch(error => {
                showAlert(t('profileScreen.serverUnreachable') + SERVER_ADDRESS);
            });
        setPasswordUser('');
    }

    function submitCreateUserForm() {
        if(!sizeFormInputOK()){
            showAlert(t('profileScreen.fieldsTooShort2'));
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
                showAlert(t('profileScreen.serverError'));
            }
            else {
                return response.json();
            }
        }).then(data => {
            showAlert(t('profileScreen.accountCreated'))
            setTitleText(t('profileScreen.userAccount'));
            setShowForm(false);
        })
            .catch(error => {
                showAlert(t('profileScreen.serverUnreachable') + SERVER_ADDRESS);
            });
        setPasswordUser('');
    }

    function cancelForm() {
        setFirstName('');
        setLastName('');
        setPasswordUser('');
        setShowForm(false)
        setTitleText(t('profileScreen.userAccount'));
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
        Alert.alert(t('profileScreen.deleteAccountTitle'), t('profileScreen.deleteAccountPrompt'), [
            {
                text: t('profileScreen.cancel'),
                style: 'cancel',
            },
            {
                cancelable: true,
            },
            {
                text: t('profileScreen.OK'), onPress: deleteProfileConfirmed
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
                showAlert(t('profileScreen.serverError'));
            }
            else {
                return response;
            }
        }).then(data => {
            if(data.text() === "ERROR"){
                showAlert(t('profileScreen.deletionError'));
            }
            else {
                showAlert(t('profileScreen.accountDeleted'));
                disconnectProfile();
            }
        })
            .catch(error => {
                showAlert(t('profileScreen.serverUnreachable') + SERVER_ADDRESS);
            });
    }
};

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        height: "93%"
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

export default ProfileScreen;
