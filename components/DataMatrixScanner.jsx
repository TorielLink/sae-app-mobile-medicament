import { CameraView } from 'expo-camera/next';
import { Camera } from 'expo-camera'
import React, { useState, useEffect} from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import AdaptativeAlert from "./AdaptativeAlert";

export default function DataMatrixScanner({sendCIP}) {
    const[hasCameraPermission, setHasCameraPermission] = useState(null)
    const[scanned, setScanned] = useState(null)

    useEffect(() => {
        askForCameraPermission();
    }, [])

    const askForCameraPermission = () => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }

    function cleanCIPAndSend(data) {
        const regex = /010(\d{13})/;
        const matchedCIP = data.match(regex);
        if(matchedCIP){
            sendCIP(matchedCIP[1]);
        }
        else {
            AdaptativeAlert('Merci de scanner un médicament');
        }
    }

    const handleBarCodeScanned = ({data}) => {
        setScanned(true)
        cleanCIPAndSend(data);
    }

    return (
        <>
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
                    {scanned && <Button title="Scanner une nouvelle fois" onPress={() => setScanned(false)} />}
                </>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    camera: {
        height: 200,
        width: 200,
        minHeight: 200
    }
})