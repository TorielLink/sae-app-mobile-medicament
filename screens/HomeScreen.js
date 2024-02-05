import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';

const dataBaseCIP = [
    "coucou", "cou", "loup", "mou", "dodo", "beau", "cloclo", "esteban",
]

export default function Home() {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <View style={stylesHome.screen}>
            <Searchbar
                placeholder="Insérer un CIP"
                onChangeText={setSearchQuery}
                value={searchQuery}
                iconColor={"#7DAE32"}
                style={{ backgroundColor: '#E4F2CF' }}
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
    safe: {
        flex: 1,
        backgroundColor: '#252b33',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
    container2: {
        backgroundColor: '#252b33',
        padding: 18,
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