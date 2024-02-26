import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SearchbarCIP from '../components/SearchbarCIP';
import DataMatrixScanner from "../components/DataMatrixScanner";
import TestBD from '../components/testBD';
import {log} from "expo/build/devtools/logger";

export default function Home() {
    return (
        <View style={stylesHome.screen}>
            <SearchbarCIP/>
            <DataMatrixScanner/>
            <TestBD/>
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
