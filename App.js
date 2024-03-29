import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {DefaultTheme, PaperProvider} from "react-native-paper";

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChartsScreen from './screens/ChartsScreen';

const Tab = createBottomTabNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    },
};

export default function App() {
    const [isAdmin, setIsAdmin] = useState(false);
    return (
            <PaperProvider theme={theme}>
                <NavigationContainer>
                    <Tab.Navigator initialRouteName="Home">
                        <Tab.Screen
                            name="Settings"
                            component={SettingsScreen}
                            options={{
                                tabBarIcon: makeIconRender("cog"),
                                tabBarActiveTintColor: "#7DAE32" }}
                        />
                        <Tab.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{
                                tabBarIcon: makeIconRender("home"),
                                tabBarActiveTintColor: "#7DAE32"
                        }}/>
                        <Tab.Screen
                            name="Profile"
                            component={ProfileScreen}
                            options={{
                                tabBarIcon: makeIconRender("baby-face-outline"),
                                tabBarActiveTintColor: "#7DAE32"
                        }}/>
                        {/*{isAdmin && (*/}
                            <Tab.Screen
                                name={"Charts"}
                                component={ChartsScreen}
                                options={{
                                    tabBarIcon: makeIconRender("chart-donut"),
                                    tabBarActiveTintColor: "#7DAE32"
                            }}/>
                        {/*})}*/}
                    </Tab.Navigator>
                </NavigationContainer>
            </PaperProvider>
    );
}

function makeIconRender(name) {
    return ({ color, size }) => (
        <MaterialCommunityIcons name={name} color={color} size={size} />
    );
}
