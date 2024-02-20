import * as React from 'react';
import {Text, View} from "react-native";
import {useEffect, useState} from "react";
import {ActivityIndicator} from "react-native-paper";

export default function testBD() {
    const [loadingState, setLoadingState] = useState(false);
    const [jsonData, setJsonData] = useState(null);
    useEffect(() => {

        const fetchData = async () => {
            setLoadingState(true);
            try {
                const response = await fetch('http://localhost:3000/medoc');//TODO changer ici l'adresse
                const data = await response.json();
                setJsonData(data);
            } catch (error) {
                setJsonData('Error fetching data: ' + error);
            } finally {
                setLoadingState(false);
            }
        };

        fetchData();

    }, []);

    return (
        <>
            {loadingState ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : jsonData ? (
                <Text>{JSON.stringify(jsonData)}</Text>
            ) : (
                <Text>No data available</Text>
            )}
        </>
    );
}
