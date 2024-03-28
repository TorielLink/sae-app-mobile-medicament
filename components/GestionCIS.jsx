import React, { useState, useEffect } from 'react';
import { Button, Modal, Portal, Searchbar, List } from 'react-native-paper';
import {StyleSheet, View} from "react-native";
import DataMatrixScanner from "./DataMatrixScanner";
import AdaptativeAlert from "./AdaptativeAlert";
import {SERVER_ADDRESS} from "../constants/constants";

export default function GestionCIS() {
    const [searchQuery, setSearchQuery] = useState('');
    const [scanVisible, setScanVisibility] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            searchDrug(searchQuery);
        } else {
            setSuggestions([]);
        }
    }, [searchQuery]);

    //TODO: connect to a database
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
            AdaptativeAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ')');
        });
    }

    //TODO : gérer l'évènement clic
    const handleSuggestionPress = (suggestion) => {
        setSearchQuery(suggestion);
        setSuggestions([]);
        updateBdmStatus(suggestion);
    };

    function updateBdmStatus(CIS) {
        //TODO : ne pas modifier le statut BDM directement
        fetch(SERVER_ADDRESS + '/updateMedStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CIS: CIS,
                newStatus: 'Warning disponibilité',
            }),
        }).then(response => {
            if (!response.ok) {
                AdaptativeAlert('Erreur lors de la mise à jour du statut Bdm');
            } else {
                AdaptativeAlert('Statut Bdm mis à jour avec succès');
            }
        }).catch(error => {
            AdaptativeAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ')');
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Entrez un CIP ou un CIS"
                    onChangeText={(query) => {
                        setSearchQuery(query);
                        searchDrug(query); // Appeler la fonction de recherche à chaque changement dans la barre de recherche
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
                    <DataMatrixScanner />
                </Modal>
            </Portal>
            <List.Section style={styles.suggestionList}>
                {suggestions.map((item, index) => (
                    <List.Item
                        key={index}
                        title={item.Denomination}
                    />
                ))}
            </List.Section>
        </View>
    );

    function saveCIPtoDataBase(cip) {
        {/*TODO PAS DU TOUT FINI*/}
        fetch(SERVER_ADDRESS + '/addOrdonance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUser: getIdUser(),
            }),
        }).then(response => {
            if (!response.ok) {
                AdaptativeAlert('Erreur du serveur')
            } else {
                return response.json();
            }
        }).then(data => {
            //...
        }).catch(error => {
            AdaptativeAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ')');
        });
    }
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
    }
});