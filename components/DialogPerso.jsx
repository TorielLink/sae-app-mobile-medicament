import React from "react";
import Dialog from "react-native-dialog";

export default function DialogPerso(title, desc, hasCancel, handleCancel, hasDelete, handleDelete, hasOK, handleOK) {
    return (
            <Dialog.Container visible={visible}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Description>{desc}</Dialog.Description>
                {hasCancel && <Dialog.Button label="Annuler" onPress={handleCancel} />}
                {hasDelete &&<Dialog.Button label="Confirmer" onPress={handleDelete} />}
                {hasOK &&<Dialog.Button label="OK" onPress={handleOK} />}
            </Dialog.Container>
    );
}