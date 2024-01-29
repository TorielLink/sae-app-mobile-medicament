import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

/*
import { useEffect, useState } from 'react';
import axios from 'axios';
import Result from '../Result';
import styles from '../SearchBar.module.css';


//--------------SEARCHBAR--------------
const SearchBar = () => {
    const [value, setValue] = useState(''); // Here we'll store the value of the search bar's text input
    const [suggestions, setSuggestions] = useState([]); // This is where we'll store the retrieved suggestions
    const [hideSuggestions, setHideSuggestions] = useState(true);
    const [result, setResult] = useState(null);

    const findResult = (title) => {
        setResult(suggestions.find((suggestion) => suggestion.title === title));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `https://dummyjson.com/products/search?q=${value}`
                );

                setSuggestions(data.products);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [value]);

    return (
        <>
            <div className={styles.container}>
                <input
                    onFocus={() => setHideSuggestions(false)}
                    onBlur={async () => {
                        setTimeout(() => {
                            setHideSuggestions(true);
                        }, 200);
                    }}
                    type="text"
                    className={styles.textbox}
                    placeholder="Search data..."
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                />
                <div
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
                </div>
            </div>
            {result && <Result {...result} />}
        </>
    );
};
 */

const Screen1 = props => {
    return (
        <View style={stylesScreen1.screen}>
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