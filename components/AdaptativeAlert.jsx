import {Alert, Platform} from "react-native";

export default function AdaptativeAlert(message){
    if(Platform.OS === 'web'){
        alert(message)
    }
    else {
        Alert.alert(message);
    }
}