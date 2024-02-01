import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import { useEffect, useState } from 'react';

const dataBaseCID = [
    "coucou", "cou", "loup", "mou", "dodo", "beau", "cloclo"
]


//--------------SEARCHBAR--------------
const SearchBar = () => {
    const [value, setValue] = useState('');
    //const [suggestions, setSuggestions] = useState([]);
    //const [hideSuggestions, setHideSuggestions] = useState(true);
    const [result, setResult] = useState([]);

    const findResult = (title) => {
        //setResult(suggestions.find((suggestion) => suggestion.title === title));
    };

    useEffect(() => {
        /*const fetchData = async () => {
            try {
                // const { data } = ;

                setSuggestions(data.products);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();*/

        setResult([])

        console.log(value + ' '+ result.toString())
        dataBaseCID.map((item) => {
            if(item.includes(value)) {
                setResult((prevResult) => [...prevResult, item])
            }
        })

    }, [value]);

    return (
        <>
            <div>
                <input
                    //onFocus={() => setHideSuggestions(false)}
                    /*onBlur={async () => {
                        setTimeout(() => {
                            setHideSuggestions(true);
                        }, 200);
                    }}*/
                    type="text"
                    placeholder="Entrez un CIP"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        console.log('HEY!')
                    }}
                />
                {/*<div
                    className={`${styles.suggestions} ${
                        hideSuggestions && styles.hidden
                    }`}
                >
                    {suggestions.map((suggestion) => (
                        <div
                            className={styles.suggestion}
                            onClick={() => findResult(suggestion.title)}
                        >
                            {suggestion.title}
                        </div>
                    ))}
                </div>*/}
            </div>
            <ul>
                {result.map((item, index) => {
                    <li key={index}>{item}</li>
                })}
            </ul>
            {/*result */}
        </>
    );
};

const Screen1 = props => {
    return (
        <View style={stylesScreen1.screen}>
            {/*<SearchBar/>*/}
            <Text>Screen 1</Text>
        </View>
    );
};

const stylesScreen1 = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Screen1;