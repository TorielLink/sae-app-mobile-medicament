import * as React from 'react';
import {Button, DataTable, Modal, Text} from 'react-native-paper';
import {Alert, Platform, StyleSheet, View} from "react-native";
import {useEffect} from "react";

const SERVER_ADDRESS = 'https://remi-lem.alwaysdata.net/saeGestionMedicaments'; //TODO modifier si besoin

const noDataOrdonances = [
    {
        key: 0,
        name: 'Aucun médicament.',
        quantity: 0,
    },
];

export default function SelectionDrugs({hide, onOK, getIdUser}) {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    const [items, setItems] = React.useState([
        {
            key: 0,
            name: 'Chargement...',
            quantity: 0,
        },
    ]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    useEffect(() => {
        fetchUserMedoc();
    }, []);

    return (
        <Modal
            visible={true}
            contentContainerStyle={styles.modalContainerStyle}
            onDismiss={() => {
                hide();
            }}>
            <View style={styles.modalContent}>
                <Text>Modification de mes médicaments</Text>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Nom</DataTable.Title>
                        <DataTable.Title numeric>Quantité</DataTable.Title>
                    </DataTable.Header>

                    {items.slice(from, to).map((item) => (
                        <DataTable.Row key={item.key}>
                            <DataTable.Cell>{item.name}</DataTable.Cell>
                            <DataTable.Cell numeric>{item.quantity}</DataTable.Cell>
                        </DataTable.Row>
                    ))}

                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(items.length / itemsPerPage)}
                        onPageChange={(page) => setPage(page)}
                        label={`${from + 1}-${to} of ${items.length}`}
                        numberOfItemsPerPageList={numberOfItemsPerPageList}
                        numberOfItemsPerPage={itemsPerPage}
                        onItemsPerPageChange={onItemsPerPageChange}
                        showFastPaginationControls
                        selectPageDropdownLabel={'Rows per page'}
                    />
                </DataTable>
                <Button
                    onPress={onOK()}>
                    <Text>Valider</Text>
                </Button>
                <Button
                    onPress={() => {
                        hide();
                    }}>
                    <Text>Annuler</Text>
                </Button>
            </View>
        </Modal>
    );

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
        console.log(getIdUser());
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
                showAlert('Erreur du serveur')
            }
            return response.json();
        }).then(data => {
            updateItems(data);
        }).catch(error => {
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

};

const styles = StyleSheet.create({
    modalContainerStyle: {
        alignItems: 'center',
        backgroundColor: 'grey',
        padding: 20,
        borderRadius: 10
    },
    modalContent: {
        maxWidth: 400,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    }
});