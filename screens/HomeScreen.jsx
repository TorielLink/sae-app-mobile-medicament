import React from 'react';
import { View, StyleSheet } from 'react-native';
import GestionCIS from '../components/GestionCIS';
import LastSignalementsList from "../components/LastSignalementsList";

export default function Home() {
    return (
        <View style={stylesHome.screen}>
            <View style={stylesHome.containerCIS}>
                <GestionCIS/>
            </View>
            <LastSignalementsList/>
        </View>
    );
}

const stylesHome = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerCIS: {
        zIndex: 5,
        marginVertical: 40,
    }
});
