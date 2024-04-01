import React, { createContext, useContext, useState } from 'react';
import {SERVER_ADDRESS} from "../constants/constants";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [idUserForContext, setIdUserForContext] = useState(null);

    const storeUserId = (id) => {
        setIdUserForContext(id);
    };

    const handleCIPEntered = (cip) => {
        if(idUserForContext !== null){
            addCIPToOrdonnance(cip, idUserForContext)
        }
    };

    return (
        <UserContext.Provider value={{ idUserForContext, storeUserId, handleCIPEntered }}>
            {children}
        </UserContext.Provider>
    );

    function addCIPToOrdonnance(cip, userID) {
        fetch(SERVER_ADDRESS + '/prescription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CIP: cip,
                idUser: userID
            }),
        }).then(response => {
            if (response.ok) {
                return response;
            }
        }).then(() => {
            //ajout OK
        })
            .catch(() => {
                //pas de réseau
            });
    }
};