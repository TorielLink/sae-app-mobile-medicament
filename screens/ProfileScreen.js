import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const Screen2 = props => {
    return (
        <View style={styles.screen}>
            <Text>Screen 2</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Screen2;