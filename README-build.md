## Packaging de l'application

Installation de l'outil EAS
```shell
npm install -g eas-cli
```

Lancement local :
```shell
eas build --platform android --local
```

Lancement distant :
```shell
eas build --profile preview --platform android
```

### Notes
26/02/2024 - Erreur de lancement : Invariant Violation: requireNativeComponent: "RNSScreen" was not found in the UIManager.
