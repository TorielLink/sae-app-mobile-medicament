import React, { useState, useEffect } from 'react';
import { Button, Modal, Portal, Searchbar, List } from 'react-native-paper';
import { StyleSheet, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import DataMatrixScanner from "./DataMatrixScanner";
import AdaptativeAlert from "./AdaptativeAlert";
import {SERVER_ADDRESS} from "../constants/constants";

export default function GestionCIS() {
    const [searchQuery, setSearchQuery] = useState('');
    const [scanVisible, setScanVisibility] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [offlineQueue, setOfflineQueue] = useState([]);
    const [isConnected, setIsConnected] = useState(true);

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
                console.error('Erreur lors du chargement de la saisie locale:', error);
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
    const handleSuggestionPress = (suggestion) => {
        setSearchQuery(suggestion);
        setSuggestions([]);
        saveInputLocally(suggestion);
        saveCIPToDataBase(suggestion);
    };

    function saveCIPToDataBase(CIP) {
        //TODO a faire
        AdaptativeAlert("CIP " + CIP + " SAVED TO BD")
        /*
        fetch(SERVER_ADDRESS + '/prescription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CIP: CIP,
                newStatus: true,
                quantity: 1
            }),
        }).then(response => {
            if (!response.ok) {
                AdaptativeAlert('Erreur lors du signalement du médicament')
            } else {
                AdaptativeAlert('Médicament signalé avec succès');
            }
        }).catch(error => {
            AdaptativeAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ')');
        });
        */
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
        <View style={styles.container}>
            <View>
                {!isConnected && (
                    <Text>Hors connexion</Text>
                )}
            </View>
            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Entrez un CIP ou un CIS"
                    onChangeText={(query) => {
                        setSearchQuery(query);
                        searchDrug(query);
                    }}
                    keyboardType={"numeric"}
                    value={searchQuery}
                    iconColor={"#7DAE32"}
                    style={styles.searchbar}
                />
                <Button
                    icon="data-matrix-scan"
                    mode="contained"
                    onPress={() => setScanVisibility(true)}
                    buttonColor={"#FFF"}
                    textColor={"black"}
                    compact={true}
                    contentStyle={styles.buttonIcon}
                >Scan</Button>
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
                        onPress={() => handleSuggestionPress(item.CIS)}
                    />
                ))}
            </List.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    searchbar: {
        backgroundColor: '#E4F2CF',
        maxWidth: '80%'
    },
    buttonIcon: {
        height: 56,
    },
    suggestionList: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        backgroundColor: '#E4F2CF',
        marginTop: 10,
        maxHeight: 200,
        width: '80%',
        alignSelf: 'left',
        borderRadius: 10,
    },
    containerStyle: {
        backgroundColor: 'white',
        padding: 20
    },
});