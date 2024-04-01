import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Modal, Portal} from "react-native-paper";

const RGPDConsent = ({ onAccept, onDecline }) => {
    const [privacyPolicy, setPrivacyPolicy] = useState(false);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Nous utilisons des cookies pour améliorer votre expérience. Acceptez-vous notre
                <TouchableOpacity style={styles.linkPrivacy} onPress={() => setPrivacyPolicy(true)}>
                    <Text> politique de confidentialité </Text>
                </TouchableOpacity>
                ?
            </Text>
            <View style={styles.buttonContainer}>
                <Button onPress={onAccept} buttonColor={"#7DAE32"} mode="contained">Accepter</Button>
                <Button onPress={onDecline} buttonColor={"#7DAE32"} mode="contained">Refuser</Button>
            </View>
            {privacyPolicy &&
                <Portal>
                    <Modal visible={privacyPolicy}
                           onDismiss={()=> setPrivacyPolicy(false)}
                           contentContainerStyle={styles.containerStyle}>
                        <Text>Politique de confidentialité</Text>
                        <Text>Nous traitons vos données à des buts statistiques uniquement (réapprovisionnement des
                            stocks de médicaments dans les pharmacies)</Text>
                    </Modal>
                </Portal>
                }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        margin: 20,
    },
    text: {
        marginBottom: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    containerStyle: {
        backgroundColor: 'white',
        padding: 20
    },
    linkPrivacy: {
        color: '#0000ff'
    }
});

export default RGPDConsent;
