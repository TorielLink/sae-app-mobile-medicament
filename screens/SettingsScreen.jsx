import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Switch } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import i18n from 'i18next';

export default function SettingsScreen() {
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const [localisationEnabled, setLocalisationEnabled] = useState(false);
    const [cameraAccess, setCameraAccess] = useState(false);

    const toggleNotificationSwitch = async () => {
        if (notificationEnabled) {
            setNotificationEnabled(false);
        } else {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status === 'granted') {
                setNotificationEnabled(true);
            } else {
                Alert.alert(i18n.t('settingsScreen.permissionDeniedTitle'), i18n.t('settingsScreen.permissionDeniedNotification'));
            }
        }
    };

    const toggleLocalisationSwitch = async () => {
        if (localisationEnabled) {
            setLocalisationEnabled(false);
        } else {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                setLocalisationEnabled(true);
            } else {
                Alert.alert(i18n.t('settingsScreen.permissionDeniedTitle'), i18n.t('settingsScreen.permissionDeniedLocation'));
            }
        }
    };

    const toggleCameraSwitch = async () => {
        if (cameraAccess) {
            setCameraAccess(false);
        } else {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === 'granted') {
                setCameraAccess(true);
            } else {
                Alert.alert(i18n.t('settingsScreen.permissionDeniedTitle'), i18n.t('settingsScreen.permissionDeniedCamera'));
            }
        }
    };

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <View style={styles.container}>
            <View style={styles.setting}>
                <Text>Notifications</Text>
                <Switch value={notificationEnabled} onValueChange={toggleNotificationSwitch} color={"#7DAE32"} />
            </View>
            <View style={styles.setting}>
                <Text>Autoriser la localisation</Text>
                <Switch value={localisationEnabled} onValueChange={toggleLocalisationSwitch} color={"#7DAE32"} />
            </View>
            <View style={styles.setting}>
                <Text>Autoriser la caméra</Text>
                <Switch value={cameraAccess} onValueChange={toggleCameraSwitch}  color={"#7DAE32"} />
            </View>
            <View style={styles.languageButtonContainer}>
                <Button title="English" onPress={() => changeLanguage('en')} />
                <Button title="Français" onPress={() => changeLanguage('fr')} />
                <Button title="Espanol" onPress={() => changeLanguage('es')} />
                <Button title="Deutsch" onPress={() => changeLanguage('de')} />
            </View>
            {cameraAccess && <Camera style={styles.camera} />}
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
    languageButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
});