import {Modal, Pressable, View} from "react-native";

export default function SelectionDrugs({isVisible, setVisibility, onOK}) {
    return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={isVisible}
                onRequestClose={() => {
                    setVisibility(!isVisible);
                }}>
                <View>
                    <Text>Modification de mes médicaments</Text>
                    <Text>plein de choses super ici</Text>{/*TODO*/}
                    <Pressable
                        onPress={onOK}>
                        <Text>Valider</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setVisibility(!isVisible)}>
                        <Text>Annuler</Text>
                    </Pressable>
                </View>
            </Modal>
    );
};