import React, { useState } from 'react';
import {Button, Modal, Portal, Searchbar} from 'react-native-paper';
import {StyleSheet, View} from "react-native";
import DataMatrixScanner from "./DataMatrixScanner";

export default function GestionCIS() {
    const [searchQuery, setSearchQuery] = useState('');
    const [scanVisible, setScanVisibility] = useState(false);

    //TODO: connect to a database
    //TODO: insert an scanning option
    return(
        <View style={styles.view}>
            <Searchbar
                placeholder="Insérer un CIP"
                onChangeText={setSearchQuery}
                keyboardType={"numeric"}
                value={searchQuery}
                iconColor={"#7DAE32"}
                style={styles.searchbar}
            />
            <Button
                icon="data-matrix-scan"
                onPress={() => setScanVisibility(true)}
                buttonColor={"#FFF"}
                style={styles.button}
                contentStyle={styles.buttonIcon}
            ></Button>
            <Portal>
                <Modal visible={scanVisible} onDismiss={()=> setScanVisibility(false)}>
                    <DataMatrixScanner></DataMatrixScanner>
                </Modal>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchbar: {
        backgroundColor: '#E4F2CF',
        maxWidth: '80%'
    },
    button: {
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 10
    },
    buttonIcon: {
        height: 50,
        width: 50
    }
});