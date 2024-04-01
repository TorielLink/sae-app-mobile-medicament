import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {DefaultTheme, PaperProvider} from "react-native-paper";

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import {UserProvider} from "./contexts/UserContext";

const Tab = createBottomTabNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    },
};

export default function App() {
    return (
            <PaperProvider theme={theme}>
                <UserProvider>
                    <NavigationContainer>
                        <Tab.Navigator initialRouteName="Accueil">
                            <Tab.Screen
                                name="Paramètres"
                                component={SettingsScreen}
                                options={{
                                    tabBarIcon: makeIconRender("cog"),
                                    tabBarActiveTintColor: "#7DAE32"
                                }}/>
                            <Tab.Screen
                                name="Accueil"
                                component={HomeScreen}
                                options={{
                                    tabBarIcon: makeIconRender("home"),
                                    tabBarActiveTintColor: "#7DAE32"
                                }}/>
                            <Tab.Screen
                                name="Profil"
                                component={ProfileScreen}
                                options={{
                                    tabBarIcon: makeIconRender("account-circle"),
                                    tabBarActiveTintColor: "#7DAE32"
                                }}/>
                        </Tab.Navigator>
                    </NavigationContainer>
                </UserProvider>
            </PaperProvider>
    );
}

function makeIconRender(name) {
    return ({ color, size }) => (
        <MaterialCommunityIcons name={name} color={color} size={size} />
    );
}
