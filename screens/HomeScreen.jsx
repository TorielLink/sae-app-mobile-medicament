import React from 'react';
import { View, StyleSheet } from 'react-native';
import GestionCIS from '../components/GestionCIS';

export default function Home() {
    return (
        <View style={stylesHome.screen}>
            <View style={{zIndex: 5}}>
                <GestionCIS/>
            </View>
        </View>
    );
}

const stylesHome = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
