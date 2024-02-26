## Packaging de l'application

Installation de l'outil EAS
```shell
npm install -g eas-cli
```

Build local :
```shell
ANDROID_HOME=$HOME/Android/Sdk eas build --profile preview --platform android --local
```

Build distant :
```shell
eas build --profile preview --platform android
```