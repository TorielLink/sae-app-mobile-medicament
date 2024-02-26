import React, { useState } from 'react';
import {Searchbar} from 'react-native-paper';

const dataBaseCIP = [
    "coucou", "cou", "loup", "mou", "dodo", "beau", "cloclo", "esteban",
]

export default function SearchbarCIP() {
    const [searchQuery, setSearchQuery] = useState('');

    //TODO: connect to a database
    //TODO: insert an scanning option
    return(
        <Searchbar
            placeholder="Insérer un CIP"
            onChangeText={setSearchQuery}
            keyboardType={"numeric"}
            value={searchQuery}
            iconColor={"#7DAE32"}
            style={{ backgroundColor: '#E4F2CF' }}
        />
    )
}