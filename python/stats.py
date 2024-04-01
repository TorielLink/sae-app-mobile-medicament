import pandas as pd
import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

def calculate_statistics():
    host = os.getenv('DB_ADDR')
    user = os.getenv('DB_USER')
    password = os.getenv('DB_PASSW')
    database = os.getenv('DB_NAME')

    conn = mysql.connector.connect(host=host, user=user, password=password, database=database)

    df = pd.read_sql("SELECT * FROM Signalements", conn)

    mean_nb_signalements = df['Nb_Signalement'].mean()
    median_nb_signalements = df['Nb_Signalement'].median()
    std_dev_nb_signalements = df['Nb_Signalement'].std()
    total_signalements = df['Nb_Signalement'].sum()

    df['Date_Signalement'] = pd.to_datetime(df['Date_Signalement'])
    signalements_par_mois = df.groupby(df['Date_Signalement'].dt.to_period('M')).size()
    dernier_signalement = df['Date_Signalement'].max()

    statistics = {
        "mean_nb_signalements": mean_nb_signalements,
        "median_nb_signalements": median_nb_signalements,
        "std_dev_nb_signalements": std_dev_nb_signalements,
        "total_signalements": total_signalements,
        "signalements_par_mois": signalements_par_mois.tolist(),
        "dernier_signalement": dernier_signalement.strftime("%Y-%m-%d")
    }

    conn.close()

    return statistics
