import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Alert } from 'react-native';
import { Notifications } from 'expo';
import { Camera } from 'expo-camera';

export default async function SettingsScreen() {
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const [localisationEnabled, setLocalisationEnabled] = useState(false);
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasNotificationPermission, setHasNotificationPermission] = useState(null);

    useEffect(() => {
        checkCameraPermission();
        checkNotificationPermission();
    }, []);

    const checkCameraPermission = async () => {
        const {status} = await Camera.requestPermissionsAsync();
        setHasCameraPermission(status === 'granted');
    };
    const checkNotificationPermission = async () => {
        const {status} = await Notification.requestPermissionsAsync();
        setHasNotificationPermission(status === 'granted');
    };

    const toggleNotificationSwitch = () => setNotificationEnabled(previousState => !previousState);
    const toggleLocalisationSwitch = () => s
    if (!hasNotificationPermission) {
        const {status} = await Notification.requestPermissionsAsync();
        if (status === 'granted') {
            setNotificationEnabled(true);
        } else {
            Alert.alert('Autorisation refusée', 'Vous avez refusé l\'accès aux Notification.');
            setNotificationEnabled(false);
        }
    } else {
        setNotificationEnabled(previousState => !previousState);
        if (!notificationEnabled) {
            await Notifications.requestPermissionsAsync();
        }
    }
    const toggleCameraSwitch = async () => {
        if (!hasCameraPermission) {
            const { status } = await Camera.requestPermissionsAsync();
            if (status === 'granted') {
                setCameraEnabled(true);
            } else {
                Alert.alert('Autorisation refusée', 'Vous avez refusé l\'accès à la caméra.');
                setCameraEnabled(false);
            }
        } else {
            setCameraEnabled(previousState => !previousState);
            if (!cameraEnabled) {
                await Camera.requestPermissionsAsync();
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.setting}>
                <Text>Notifications</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={notificationEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleNotificationSwitch}
                    value={notificationEnabled}
                />
            </View>
            <View style={styles.setting}>
                <Text>Autoriser la localisation</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={localisationEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleLocalitionSwitch}
                    value={localisationEnabled}
                />
            </View>
            <View style={styles.setting}>
                <Text>Autoriser la caméra</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={cameraEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleCameraSwitch}
                    value={cameraEnabled}
                />
            </View>
            {cameraEnabled && <Camera style={styles.camera} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    setting: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    camera: {
        width: '100%',
        height: 300,
        marginTop: 20,
    },
});