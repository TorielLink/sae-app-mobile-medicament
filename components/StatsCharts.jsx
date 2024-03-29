import {View} from "react-native";
import {Text} from "react-native-paper";
import React from "react";
import { BarChart } from 'react-native-chart-kit';

const data = [
    //TODO: fill with our data
];
export default function StatsCharts() {
    return (
        <>
            <View>
                <Text>EN COURS DE CONSTRUCTION</Text>
            </View>
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
        </>
    );
};
