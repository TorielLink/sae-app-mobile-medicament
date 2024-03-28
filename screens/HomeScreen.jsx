import React from 'react';
import { View, StyleSheet } from 'react-native';
import GestionCIS from '../components/GestionCIS';
import { Calendar } from 'react-native-calendars';

const SERVER_ADDRESS = 'https://remi-lem.alwaysdata.net/saeGestionMedicaments';

export default function Home() {
    return (
        <View style={stylesHome.screen}>
            <View style={stylesHome.container}>
                <GestionCIS SERVER_ADDRESS={SERVER_ADDRESS}/>
                <Calendar
                    style={stylesHome.calendar}
                />
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
