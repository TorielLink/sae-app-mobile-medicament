## Utilisation du serveur

Lancement du serveur :
```shell
node server.js
```

Pour tester, voici un MODÈLE :
```shell
curl -X POST http://localhost:3000/<item> -H 'Content-Type: application/json' -d '{firstName: "<blabla>", lastName: "<tructruc>", ...}'
```
Par exemple :
```shell
curl -X POST http://localhost:3000/prescription -H 'Content-Type: application/json' -d '{"firstName": "Rémi", "lastName": "L", "idMedoc": "60009573", "quantityMedoc": '1'}'
```