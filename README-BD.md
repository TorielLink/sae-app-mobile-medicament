# Utilisation de la base de données

_Mise a jour par Rémi le 04/03/2023_

### ETAPES D'IMPORT
1) Pré-requis
    - avoir les accès PHPMyAdmin distant (alwaysdata)
    - avoir installé en local MySQL et PHPMyAdmin
2) Télécharger les fichiers de spécialité de et présentation sur le site suivant
   https://base-donnees-publique.medicaments.gouv.fr/telechargement.php
3) Changer l'encodage des fichiers en utf8 :
   ```shell
    iconv -f iso-8859-1 -t utf-8 -o CIS_bdpm-conv.txt CIS_bdpm.txt
    iconv -f iso-8859-1 -t utf-8 -o CIS_CIP_bdpm-conv.txt CIS_CIP_bdpm.txt
    ```
4) Importer le fichier CIS_CIP_bdpm-conv.txt dans LibreOffice Calc et ne garder que les codes CIS, CIP7 et CIP13, puis exporter les données restantes en CSV
5) Création des tables :
    ```sql
    CREATE TABLE Medicaments (
    Code_CIS INT PRIMARY KEY,
    Denomination VARCHAR(255),
    Forme_pharmaceutique VARCHAR(100),
    Voies_administration VARCHAR(255),
    Statut_AMM VARCHAR(50),
    Type_procédure_AMM VARCHAR(50),
    Etat_commercialisation VARCHAR(50),
    Date_AMM DATE,
    Date_AMM_OLD CHAR(10),
    StatutBdm VARCHAR(50),
    Num_autorisation_europeenne VARCHAR(50),
    Titulaires VARCHAR(255),
    Surveillance_renforcée ENUM('Oui', 'Non')
    );

    CREATE TABLE Correspondances (
    Code_CIS INT,
    Code_CIP7 INT,
    Code_CIP13 BIGINT NOT NULL
    );
    ALTER TABLE Correspondances ADD CONSTRAINT PK_corres PRIMARY KEY (Code_CIS, Code_CIP7);
    ```
    Note : mettre les champs de date en format CHAR(10)
6) EN LOCAL, importer les données dans la base de donnée les données :
    - mettre les fichiers dans le répertoire /var/lib/mysql-files/ (avec SUDO)
    - insérer dans la base :
    ```sql
    LOAD DATA INFILE '/var/lib/mysql-files/CIS_bdpm-conv.txt' INTO TABLE Medicaments
    FIELDS TERMINATED BY '\t'
    LINES TERMINATED BY '\r\n'
    (Code_CIS, Denomination, Forme_pharmaceutique, Voies_administration, Statut_AMM, Type_procédure_AMM, Etat_commercialisation, Date_AMM_OLD, StatutBdm, Num_autorisation_europeenne, Titulaires, Surveillance_renforcée);
    
    LOAD DATA INFILE '/var/lib/mysql-files/CIS_CIP_bdpm-conv_only_usefull.csv' INTO TABLE Correspondances
    FIELDS TERMINATED BY ';'
    LINES TERMINATED BY '\n'
    (Code_CIS, Code_CIP7, Code_CIP13);
    ```
7) Passer les données de date au bon format et supprimer les colonnes inutiles (dans PHPMyAdmin)
   ```sql
    UPDATE Medicaments SET Date_AMM = STR_TO_DATE(Date_AMM_OLD, "%d/%M/%Y");
    ```
8) Exporter la base entière (menu 'exporter' de phpmyadmin)
9) Changer les collations : remplacer ```utf8mb4_0900_ai_ci``` par ```utf8mb4_general_ci```
10) Importer la base locale sur la base en ligne
