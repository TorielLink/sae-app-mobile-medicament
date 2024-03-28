import { CameraView } from 'expo-camera/next';
import {Camera} from 'expo-camera'
import React, { useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function DataMatrixScanner() {
    {/*TODO : le composant lance des warnings*/}
    const[hasCameraPermission, setHasCameraPermission] = useState(null)
    const[scanned, setScanned] = useState(null)
    const[textScanned, setTextScanned] = useState('Aucun scan effectué')

    useEffect(() => {
        askForCameraPermission();
    }, [])

    const askForCameraPermission = () => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }

    const handleBarCodeScanned = ({data}) => {
        setScanned(true)
        setTextScanned(data)
        {/*TODO envoi sur BD*/}
    }

    return (
        <View style={styles.viewCam}>
            {hasCameraPermission === null ? (
                <Text>En attente de permissions pour la caméra</Text>
            ) : hasCameraPermission === false ? (
                <>
                    <Text>Caméra refusée</Text>
                    <Button onPress={askForCameraPermission} title={"Autoriser la caméra"} />
                </>
            ) : (
                <>
                    {!scanned && <CameraView
                        barCodeScannerSettings={{ barCodeTypes: ["datamatrix"] }}
                        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={styles.camera}
                    />}
                    <Text>{textScanned}</Text>
                    {scanned && <Button title="Scanner une nouvelle fois" onPress={() => setScanned(false)} />}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    camera: {
        height: 200,
        width: 200,
        minHeight: 200
    }
})