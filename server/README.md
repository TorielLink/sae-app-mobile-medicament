## Utilisation du serveur

Mise en lige sur alwaysdata :  
Changer la constante HOME_REP_SERVER (voir sur le fichier)

Lancement du serveur :
```shell
node server.js
```

Pour tester, voici un MODÈLE :
```shell
curl -X POST https://remi-lem.alwaysdata.net/saeGestionMedicaments/<item> -H 'Content-Type: application/json' -d '{firstName: "<blabla>", lastName: "<tructruc>", ...}'
```
Par exemple :
```shell
curl -X POST https://remi-lem.alwaysdata.net/saeGestionMedicaments/prescription -H 'Content-Type: application/json' -d '{"firstName": "Rémi", "lastName": "L", "idMedoc": "60009573", "quantityMedoc": '1'}'
```