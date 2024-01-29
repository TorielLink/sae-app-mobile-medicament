import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function SettingsScreen() {
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [cameraEnabled, setCameraEnabled] = useState(false);

    const toggleNotificationSwitch = () => setNotificationEnabled(previousState => !previousState);
    const toggleLocationSwitch = () => setLocationEnabled(previousState => !previousState);
    const toggleCameraSwitch = () => setCameraEnabled(previousState => !previousState);

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
                    thumbColor={locationEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleLocationSwitch}
                    value={locationEnabled}
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