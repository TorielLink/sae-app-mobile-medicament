import React, {useEffect, useState} from "react";
import AdaptativeAlert from "./AdaptativeAlert";
import {SERVER_ADDRESS} from "../constants/constants";
import {DataTable, Modal, Portal, Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import {LineChart} from "react-native-chart-kit";

export default function AdminPanel({hideMe}) {
    const [statistics, setStatistics] = useState({});

    useEffect(() => { //TODO: doesn't work
        fetch('https://remi-lem.alwaysdata.net/apiPython/stats.json')
            .then(response => {
                if (!response.ok) {
                    AdaptativeAlert('Erreur du serveur');
                } else {
                    return response.json();
                }
            }).then(data => setStatistics(data))
            .catch(error => {
                AdaptativeAlert('Le serveur est injoignable (adresse : ' + SERVER_ADDRESS + ')' + error);
            });
    }, []);
    return (
        <Portal>
            <Modal
                visible={true}
                contentContainerStyle={styles.modalContainerStyle}
                onDismiss={() => {
                    hideMe();
                }}>
                <>
                    <View style={styles.modalContent}>
                        <Text>EN COURS DE CONSTRUCTION</Text>
                    </View>
                    <View>
                        <Text>Statistiques des signalements :</Text>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Description</DataTable.Title>
                                <DataTable.Title numeric>Valeur</DataTable.Title>
                            </DataTable.Header>
                            <DataTable.Row>
                                <DataTable.Cell>Moyenne du nombre de signalements</DataTable.Cell>
                                <DataTable.Cell numeric>{statistics.mean_nb_signalements}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Médiane du nombre de signalements</DataTable.Cell>
                                <DataTable.Cell numeric>{statistics.median_nb_signalements}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Écart-type du nombre de signalements</DataTable.Cell>
                                <DataTable.Cell numeric>{statistics.std_dev_nb_signalements}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Total des signalements</DataTable.Cell>
                                <DataTable.Cell numeric>{statistics.total_signalements}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                    </View>
                    <View>
                        <Text>Moyenne du nombre de signalements : {statistics.mean_nb_signalements}</Text>
                        <Text>Médiane du nombre de signalements : {statistics.median_nb_signalements}</Text>
                        <LineChart
                            data={{
                                labels: ['Jan', 'Feb', 'Mar', 'Apr'],
                                datasets: [{
                                    data: statistics.signalements_par_mois
                                }]
                            }}
                            width={300}
                            height={200}
                            yAxisLabel=""
                            yAxisSuffix=""
                            chartConfig={{
                                backgroundGradientFrom: '#FFFFFF',
                                backgroundGradientTo: '#FFFFFF',
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                strokeWidth: 2 // optional, default 3
                            }}
                            bezier
                        />
                    </View>
                </>
                {/*<View>
                <BarChart
                    data={{
                        labels: ['January', 'February', 'March'],
                        datasets: [{
                            data: [200, 400, 500],
                        }],
                    }}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    yAxisLabel={'$'}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#ffa726',
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                 yAxisSuffix=" unité"/>
            </View>*/}
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modalContainerStyle: {
        alignItems: 'center',
        backgroundColor: 'grey',
        padding: 20,
        borderRadius: 10
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});