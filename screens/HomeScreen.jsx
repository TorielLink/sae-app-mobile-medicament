import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SearchbarCIP from '../components/SearchbarCIP';
import DataMatrixScanner from "../components/DataMatrixScanner";
import TestBD from '../components/TestBD';
import { Calendar } from 'react-native-calendars';

export default function Home() {
    return (
        <View style={stylesHome.screen}>
            <View style={stylesHome.container}>
                <SearchbarCIP />
                <Calendar
                    style={stylesHome.calendar}
                />
            </View>
            <DataMatrixScanner />{/*TODO : ça lance des avertissements dans le navigateur*/}
            <TestBD />
        </View>
    );
}

const stylesHome = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
    calendar: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        margin: 10,
    },
});
