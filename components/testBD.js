import * as React from 'react';
import {Text} from "react-native";
import {useEffect, useState} from "react";

export default function testBD() {
    const [jsonData, setJsonData] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3000/medoc')
            .then(response => response.json())
            .then(data => setJsonData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return(
        <Text>
            <Text>{JSON.stringify(jsonData)}</Text>
        </Text>
    )
}
