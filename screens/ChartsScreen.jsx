import React from 'react';
import { View, StyleSheet } from 'react-native';
import StatsCharts from '../components/StatsCharts'

export default function ChartsScreen() {
    return (
        <View style={stylesCharts.screen}>
            <StatsCharts/>
        </View>
    );
}

const stylesCharts = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});