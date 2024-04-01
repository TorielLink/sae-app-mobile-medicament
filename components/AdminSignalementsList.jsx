import React, {useEffect, useState} from 'react';
import {Button, DataTable, Modal, Portal, Text} from 'react-native-paper';
import {StyleSheet, View} from "react-native";
import {SERVER_ADDRESS} from "../constants/constants";
import AdaptativeAlert from "./AdaptativeAlert"

const MAX_CHAR = 20;
const noSignalements = [
    {
        key: 0,
        name: 'Aucun médicament',
        quantity: 0,
        date: '0/0/0'
    },
];

export default function AdminSignalementsList({hideMe}) {
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([10, 20, 30]);
    const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
    const [items, setItems] = useState([
        {
            key: 0,
            name: 'Chargement...',
            quantity: 0,
            date: '0/0/0'
        },
    ]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    useEffect(() => {
        fetchSignalements();
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
                    <Text>Médicaments signalés par les utilisateurs :</Text>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Nom</DataTable.Title>
                            <DataTable.Title numeric>Nombre</DataTable.Title>
                            <DataTable.Title>Date</DataTable.Title>
                        </DataTable.Header>

                        {items.slice(from, to).map((item) => (
                            <DataTable.Row key={item.key}>
                                <DataTable.Cell>{truncate(item.name)}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.quantity}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.date}</DataTable.Cell>
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
                        <Text>Fermer</Text>
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
            setItems(noSignalements);
        } else {
            setItems(data.map((item) => {
                return {
                    key: item.Code_CIS,
                    name: item.Denomination,
                    quantity: item.Nb_Signalement,
                    date: new Date(item.Date_Signalement).toLocaleDateString('fr-FR')
                };
            }));
        }
    }

    function fetchSignalements() {
        fetch(SERVER_ADDRESS + '/getSignalements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).then(response => {
            if (!response.ok) {
                AdaptativeAlert('Erreur du serveur')
            }
            else {
                return response.json();
            }
        }).then(data => {
            updateItems(data);
        }).catch(() => {
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