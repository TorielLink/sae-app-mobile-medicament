import React from 'react';
import { View, StyleSheet } from 'react-native';
import GestionCIS from '../components/GestionCIS';
import {Calendar} from "react-native-calendars";

export default function Home() {
    return (
        <View style={stylesHome.screen}>
            <View style={{zIndex: 5}}>
                <GestionCIS/>
            </View>
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
    calendar: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        margin: 10,
    },
});
