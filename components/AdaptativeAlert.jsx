import {Alert, Platform} from "react-native";

export default function AdaptativeAlert(message){
    {/*TODO gerer */}
    if(Platform.OS === 'web'){
        alert(message)
    }
    else {
        Alert.alert(message);
    }
}