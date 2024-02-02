import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Screen2 = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Compte utilisateur</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        marginTop: 20,
        fontFamily: 'Goudy Bookletter 1911", sans-serif',
    }
});

export default Screen2;