import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';


//--------------NAVIGATION--------------
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: makeIconRender("cog") }}/>
                <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: makeIconRender("home") }}/>
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: makeIconRender("baby-face-outline") }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

function makeIconRender(name) {
    return ({ color, size }) => (
        <MaterialCommunityIcons name={name} color={color} size={size} />
    );
}