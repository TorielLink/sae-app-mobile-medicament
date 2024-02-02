import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Alert } from 'react-native';
import { Notifications } from 'expo';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';

export default function SettingsScreen() {
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const [localisationEnabled, setLocalisationEnabled] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasNotificationPermission, setHasNotificationPermission] = useState(null);
    const [hasLocalisationPermission, setHasLocalisationPermission] = useState(null);

    const toggleNotificationSwitch = async () => {
        if (notificationEnabled) {
            setHasNotificationPermission(false);
            setNotificationEnabled(false);
        } else {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status === 'granted') {
                setHasNotificationPermission(true);
                setNotificationEnabled(true);
            } else {
                Alert.alert('Autorisation refusée', 'Vous avez refusé l\'accès aux notifications.');
            }
        }
    };

    const toggleLocalisationSwitch = async () => {
        if (localisationEnabled) {
            setHasLocalisationPermission(false);
            setLocalisationEnabled(false);
        } else {
            const { status } = await Location.requestPermissionsAsync();
            if (status === 'granted') {
                setHasLocalisationPermission(true);
                setLocalisationEnabled(true);
            } else {
                Alert.alert('Autorisation refusée', 'Vous avez refusé l\'accès à la localisation.');
            }
        }
    };

    const toggleCameraSwitch = async () => {
        if (hasCameraPermission) {
            setHasCameraPermission(false);
        } else {
            const { status } = await Camera.requestPermissionsAsync();
            if (status === 'granted') {
                setHasCameraPermission(true);
            } else {
                Alert.alert('Autorisation refusée', 'Vous avez refusé l\'accès à la caméra.');
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
                    disabled={!hasNotificationPermission}
                />
            </View>
            <View style={styles.setting}>
                <Text>Autoriser la localisation</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={localisationEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleLocalisationSwitch}
                    value={localisationEnabled}
                    disabled={!hasLocalisationPermission}sont pas accordées
                />
            </View>
            <View style={styles.setting}>
                <Text>Autoriser la caméra</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={hasCameraPermission ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleCameraSwitch}
                    value={hasCameraPermission}
                    disabled={!hasCameraPermission}
                />
            </View>
            {hasCameraPermission && <Camera style={styles.camera} />}
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
