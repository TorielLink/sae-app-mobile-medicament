import * as React from 'react';
import {Text, View} from "react-native";
import {useEffect, useState} from "react";
import {ActivityIndicator} from "react-native-paper";

export default function testBD() {
    const [loadingState, setLoadingState] = useState(false);
    const [data, setData] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            setLoadingState(true);
            try {
                const response = await fetch('https://remi-lem.alwaysdata.net/saeGestionMedicaments/medoc');//TODO changer ici pour passer en local
                const dataServ = await response.json();
                setData("--TEST-BD-- Votre médicament est disponible : " + dataServ[0].Denomination);
            } catch (error) {
                setData("--TEST-BD-- erreur : " + error);
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
            ) : data ? (
                <Text>{data}</Text>
            ) : (
                <Text>--TEST-BD-- No data available</Text>
            )}
        </>
    );
}
