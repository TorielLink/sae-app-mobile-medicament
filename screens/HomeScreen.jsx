import React from 'react';
import { View, StyleSheet } from 'react-native';
import GestionCIS from '../components/GestionCIS';
import { Calendar } from 'react-native-calendars';
import {SERVER_ADDRESS} from "../constants/constants";

export default function Home() {
    return (
        <View style={stylesHome.screen}>
                <GestionCIS/>
                <Calendar
                    style={stylesHome.calendar}
                />
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
