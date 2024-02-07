import React from 'react';
import {View, StyleSheet} from 'react-native';
import SearchbarCIP from '../components/SearchbarCIP';
import TestBD from '../components/testBD';
import { CameraView } from "expo-camera/next";

export default function Home() {
    return (
        <View style={stylesHome.screen}>
            <SearchbarCIP></SearchbarCIP>
            <TestBD></TestBD>
            <CameraView barcodeScannerSettings={{barCodeTypes: ['datamatrix']}} facing={'back'}>
            </CameraView>
        </View>
    );
}

const stylesHome = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    safe: {
        flex: 1,
        backgroundColor: '#252b33',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
    input: {
        height: 48,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});