import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button } from "react-native-paper";
import { CameraView, useCameraPermissions } from 'expo-camera/next';
import { Platform } from 'react-native';

export default function DataMatrixScanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scannedData, setScannedData] = useState(null);
    const [facing, setFacing] = useState('back');
    const [isScannerVisible, setScannerVisible] = useState(false);

    useEffect(() => {
        if (permission && permission.granted) {
            setScannerVisible(false);
            toggleCameraFacing();
        }
    }, [permission]);

    const handleBarcodeScanned = ({ data }) => {
        setScannedData(data);
    };

    const toggleScannerVisibility = () => {
        setScannerVisible(!isScannerVisible);
    };

    const toggleCameraFacing = () => {
        const isPC = Platform.OS === 'web';

        // If the device is a PC, set to back camera, else set to front camera
        setFacing(current => (isPC ? 'back' : current === 'back' ? 'front' : 'back'));
    }

    const renderScanner = () => {
        if (!permission || !permission.granted) {
            // Camera permission not granted
            return (
                <View style={styles.container}>
                    <Text>Camera permission not granted!</Text>
                    <TouchableOpacity onPress={requestPermission}>
                        <Text>Request Permission</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        else if (permission.granted && !isScannerVisible) {
            return (
                <View style={styles.container}>
                    <Button icon="camera" mode="contained" onPress={toggleScannerVisibility} />
                </View>
            );
        }

        return (
            <CameraView
                style={styles.camera}
                facing={facing}
                onBarcodeScanned={handleBarcodeScanned}
                barCodeScannerSettings={{
                    barCodeTypes: ['datamatrix'],
                }}
            />
        );
    };

    return <View style={styles.container}>
        {renderScanner}
        <Text>{scannedData}</Text>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
    },
    camera: {
        width: '100%',
        height: '100%',
    },
});