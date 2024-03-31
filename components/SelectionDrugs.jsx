import React, {useEffect, useState} from 'react';
import {Button, DataTable, Modal, Portal, Text} from 'react-native-paper';
import {StyleSheet, View} from "react-native";
import {SERVER_ADDRESS} from "../constants/constants";
import AdaptativeAlert from "./AdaptativeAlert"

const MAX_CHAR = 20;
const noDataOrdonances = [
    {
        key: 0,
        name: 'Aucun médicament',
        quantity: 0,
    },
];

export default function SelectionDrugs({hideMe, getIdUser}) {
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
    const [items, setItems] = useState([
        {
            key: 0,
            name: 'Chargement...',
            quantity: 0,
        },
    ]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    useEffect(() => {
        fetchUserMedoc();
    }, []);

    return (
        <Portal>
            <Modal
                visible={true}
                contentContainerStyle={styles.modalContainerStyle}
                onDismiss={() => {
                    hideMe();
                }}>
                <View style={styles.modalContent}>
                    <Text>Modification de mes médicaments</Text>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Nom</DataTable.Title>
                            <DataTable.Title numeric>Code CIS</DataTable.Title>
                            <DataTable.Title numeric>Quantité</DataTable.Title>
                            <DataTable.Title>Suppression</DataTable.Title>
                        </DataTable.Header>

                        {items.slice(from, to).map((item) => (
                            <DataTable.Row key={item.key}>
                                <DataTable.Cell>{truncate(item.name)}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.key}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.quantity}</DataTable.Cell>
                                <DataTable.Cell>
                                    <Button onPress={() => removeDrug(item.key)}>Supprimer</Button>
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}

                        <DataTable.Pagination
                            page={page}
                            numberOfPages={Math.ceil(items.length / itemsPerPage)}
                            onPageChange={(page) => setPage(page)}
                            label={`${from + 1}-${to} sur ${items.length}`}
                            showFastPaginationControls
                            numberOfItemsPerPageList={numberOfItemsPerPageList}
                            numberOfItemsPerPage={itemsPerPage}
                            onItemsPerPageChange={onItemsPerPageChange}
                            selectPageDropdownLabel={'Lignes par page :'}
                        />
                    </DataTable>
                    <Button
                        onPress={() => {
                            hideMe();
                        }}>
                        <Text>Annuler</Text>
                    </Button>
                </View>
            </Modal>
        </Portal>
    );

    function truncate(str){
        return (str.length > MAX_CHAR) ? str.slice(0, MAX_CHAR-1) + '...' : str;
    }

    function updateItems(data) {
        if (data.length === 0) {
            setItems(noDataOrdonances);
        } else {
            setItems(data.map((item) => {
                return {
                    key: item.Code_CIS,
                    name: item.Denomination,
                    quantity: item.Quantité,
                };
            }));
        }
    }

    function fetchUserMedoc() {
        fetch(SERVER_ADDRESS + '/getOrdonances', {
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
            }
            else {
                return response.json();
            }
        }).then(data => {
            updateItems(data);
        }).catch(error => {
                AdaptativeAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ')');
            });
    }

    function removeDrug(CIS) {
        fetch(SERVER_ADDRESS + '/removeDrug', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUser: getIdUser(),
                CIS: CIS,
            }),
        }).then(response => {
            if (!response.ok || response === 'OK') {
                AdaptativeAlert('Erreur du serveur')
            }
            else {
                AdaptativeAlert('Médicament supprimé');
                hideMe();
            }
        }).catch(error => {
            AdaptativeAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ')');
        });
    }
};

const styles = StyleSheet.create({
    modalContainerStyle: {
        alignItems: 'center',
        backgroundColor: 'grey',
        padding: 20,
        borderRadius: 10
    },
    modalContent: {
        minWidth: '85%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});