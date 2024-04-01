import React, { useState, useEffect } from 'react';
import { Button, Modal, Portal, Searchbar, List, Text } from 'react-native-paper';
import {Platform, StyleSheet, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import DataMatrixScanner from "./DataMatrixScanner";
import AdaptativeAlert from "./AdaptativeAlert";
import {SERVER_ADDRESS} from "../constants/constants";
import {useUserContext} from "../contexts/UserContext";
import LastSignalementsList from "./LastSignalementsList";

export default function GestionCIS() {
    const [searchQuery, setSearchQuery] = useState('');
    const [scanVisible, setScanVisibility] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [offlineQueue, setOfflineQueue] = useState([]);
    const [isConnected, setIsConnected] = useState(true);

    const { handleCIPEntered } = useUserContext();

    useEffect(() => {
        if (searchQuery.length > 0) {
            searchDrug(searchQuery);
        } else {
            setSuggestions([]);
        }
    }, [searchQuery]);

    useEffect(() => {
        AsyncStorage.getItem('userInput')
            .then((input) => {
                if (input) {
                    setSearchQuery(input);
                }
            })
            .catch(error => {
                AdaptativeAlert('Erreur lors du chargement de la saisie locale:', error);
            });
    }, []);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            if (isConnected)
                sendOfflineData();
        });
        return () => {
            unsubscribe();
        };
    }, []);

    function searchDrug(CIS) {
        fetch(SERVER_ADDRESS + '/searchDrug', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CIS: CIS,
            }),
        }).then(response => {
            if (!response.ok) {
                AdaptativeAlert('Erreur du serveur');
            } else {
                return response.json();
            }
        }).then(data => {
            const limitedSuggestions = data.slice(0, 5);
            setSuggestions(limitedSuggestions);
        }).catch(error => {
            AdaptativeAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ')' + error);
        });
    }
    function handleSuggestionPress(codeCIS) {
        setSearchQuery(codeCIS);
        setSuggestions([]);
        saveInputLocally(codeCIS);
        saveCIPToDataBase(codeCIS);
    }

    function saveCIPToDataBase(CIP) {
        fetch(SERVER_ADDRESS + '/addSignalement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CIP: CIP
            }),
        }).then(response => {
            if (!response.ok) {
                AdaptativeAlert('Erreur lors du signalement du médicament')
            } else {
                AdaptativeAlert('Médicament signalé avec succès');
                setSearchQuery('');
                AsyncStorage.setItem('userInput', '').then(() => {});
            }
        }).catch(() => {
            AdaptativeAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ')');
        });

        handleCIPEntered(CIP);
    }

    function saveInputLocally(input) {
        AsyncStorage.setItem('userInput', input)
            .then(() => {
                setOfflineQueue(prevQueue => [...prevQueue, input]);
            })
            .catch(error => {
                AdaptativeAlert('Erreur lors de l\'enregistrement de la saisie localement:', error);
            });
    }

    function sendOfflineData() {
        offlineQueue.forEach(input => {
            saveCIPToDataBase(input);
        });
        setOfflineQueue([]);
    }

    return (
        <View>
            <View style={styles.containerCIS}>
                <View>
                    {!isConnected && (
                        <Text>Hors connexion</Text>
                    )}
                </View>
                <View style={styles.searchContainer}>
                    <Searchbar
                        placeholder="Entrez un médicament"
                        onChangeText={(query) => {
                            setSearchQuery(query);
                            searchDrug(query);
                        }}
                        value={searchQuery}
                        iconColor={"#7DAE32"}
                        style={styles.searchbar}
                    />
                    {Platform.OS !== 'web' && (
                        <Button
                            icon="data-matrix-scan"
                            mode="contained"
                            onPress={() => setScanVisibility(true)}
                            buttonColor={"#FFF"}
                            textColor={"black"}
                            compact={true}
                            contentStyle={styles.buttonIcon}
                        >Scan</Button>
                    )}
                </View>
                <Portal>
                    <Modal visible={scanVisible}
                           onDismiss={()=> setScanVisibility(false)}
                           contentContainerStyle={styles.containerStyle}>
                        <DataMatrixScanner sendCIP={(cip) => saveCIPToDataBase(cip)}/>
                    </Modal>
                </Portal>

                <List.Section style={styles.suggestionList}>
                    {searchQuery.length > 0 && suggestions.map((item, index) => (
                        <List.Item
                            key={index}
                            title={item.Denomination}
                            onPress={() => handleSuggestionPress(item.Code_CIS)}
                        />
                    ))}
                </List.Section>
            </View>
            <LastSignalementsList handleSignaledCIPPress={(cip) => {handleSuggestionPress(cip)}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    searchbar: {
        backgroundColor: '#E4F2CF',
        maxWidth: Platform.OS === 'web' ? '100%' : '80%'
    },
    buttonIcon: {
        height: 56,
    },
    suggestionList: {
        position: 'absolute',
        top: 50,
        backgroundColor: '#E4F2CF',
        marginTop: 10,
        width: Platform.OS === 'web' ? '100%' : '80%',
        borderRadius: 10,
    },
    containerStyle: {
        backgroundColor: 'white',
        padding: 20
    },
    containerCIS: {
        zIndex: 5,
        marginVertical: 40,
    }
});