# cryptocurrency_tracker

## Configuration du serveur Gmail (par exemple)
* Tutoriel : https://support.google.com/accounts/answer/185833
* Gmail générera un numéro secret, ce numéro devra être renseigné dans le fichier ```settings.py```, dans la constante EMAIL_HOST_PASSWORD
* Renseigner les informations lié à votre compte sur les autres constantes du type EMAIL_XXXX

## Récupération de la clé API pour coinAPI.io
* Tutoriel : https://www.coinapi.io/pricing?apikey
* Un mail avec un numéro secret (API_KEY) sera envoyé, puis le renseigner dans le fichier ```settings.py``` dans la constante X_COINAPI_KEY

## Installer les dépendances:
* Se rendre dans le dossier racine du projet
* Lancer cette commande: ```$ pip3 install -r requirements.txt```

## Lancement du processus Celery
##### Dans un terminal
``` $ celery -A Tracker_API beat -l info```
##### Dans un autre terminal
``` $ celery -A Tracker_API worker -l info```
## Lancement du serveur backend (Django)
* ``` $ python3 manager.py runserver```

## Lancement du serveur frontend (Angular)
* Aller dans le dossier frontend
* ``` $ npm i```
* ``` $ ng serve```