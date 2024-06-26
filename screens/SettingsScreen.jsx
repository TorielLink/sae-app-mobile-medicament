import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Switch } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import RGPDConsent from "../components/RGPDConsent";
import AdaptativeAlert from "../components/AdaptativeAlert";

export default function SettingsScreen() {
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const [localisationEnabled, setLocalisationEnabled] = useState(false);
    const [cameraAccess, setCameraAccess] = useState(false);
    const [showConsent, setShowConsent] = useState(true);
    const [consentAccepted, setConsentAccepted] = useState(false);

    const toggleNotificationSwitch = async () => {
        if (notificationEnabled) {
            setNotificationEnabled(false);
        } else {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status === 'granted') {
                setNotificationEnabled(true);
            } else {
                AdaptativeAlert('Vous avez refusé l\'accès aux notifications.');
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
                AdaptativeAlert('Vous avez refusé l\'accès à la localisation.');
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
                AdaptativeAlert('Vous avez refusé l\'accès à la caméra.');
            }
        }
    };

    const handleAccept = () => {
        setConsentAccepted(true);
        setShowConsent(false);
    };

    const handleDecline = () => {
        setConsentAccepted(false);
        setShowConsent(false);
    };

    const changeConsent = () => {
        setShowConsent(true);
    };

    return (
        <View style={styles.container}>
            {showConsent && (
                <RGPDConsent
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                />
            )}
            {!showConsent && (
                <View>
                    {consentAccepted ? <Text style={styles.consentText}>Vous avez accepté le consentement RGPD.</Text> :
                        <Text style={styles.consentText}>Vous avez refusé le consentement RGPD.</Text>}
                    <TouchableOpacity style={styles.changeConsentButton} onPress={changeConsent}>
                        <Text style={styles.buttonText}>Modifier le consentement RGPD</Text>
                    </TouchableOpacity>
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
                        <Switch value={cameraAccess} onValueChange={toggleCameraSwitch} color={"#7DAE32"} />
                    </View>
                </View>
            )}
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
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    changeConsentButton: {
        backgroundColor: '#7DAE32',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 35,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    consentText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
    },
});
