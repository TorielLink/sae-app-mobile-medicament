import React from 'react';
import { View, StyleSheet } from 'react-native';
import GestionCIS from '../components/GestionCIS';
export default function Home() {
    return (
        <View style={stylesHome.screen}>
            <GestionCIS/>
        </View>
    );
}

const stylesHome = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
    },
});
