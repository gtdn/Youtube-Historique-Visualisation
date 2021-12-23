# Projet de visualisation de l'historique Youtube

## Web page du site
https://gtdn.github.io/data_viz-project/

## Pour tester la visualisation sur vos donnés

#### Etape 1 - Récupérer votre historique Youtube
1.  Aller sur http://google.com/takeout
1.  Sélectionnez "désélectionner tout" en haut
1.  Faites défiler vers le bas et sélectionnez "YouTube et YouTube Music"
1.  Sélectionnez ensuite "Toutes les données YouTube incluses" sous l'option "YouTube et YouTube Music"
1.  Sélectionnez "désélectionner tout" (à nouveau) dans cette fenêtre contextuelle
1.  Sélectionnez "historique", puis "ok"
1.  Sélectionnez "Étape suivante", laissez "exporter une fois" sélectionné
1.  Laissez .zip sélectionné et 2 Go sélectionnés (le téléchargement ne fera que quelques Mo)
1.  Le téléchargement devrait être prêt dans quelques minutes, actualisez la page sur https://takeout.google.com/ et vous verrez un bouton "Télécharger"

#### Etape 2 - Mapper votre historique avec les informations sur chaque vidéos
Lancer un serveur python dans le dossier git
> `python3  -m http.server 8000`

Enregistrer votre historique Youtube récupéré à l'étape 1 dans `/data/history`

Modifier le fichier `dataExtractor.html` et changer le chemin avec `/data/history/yourdatahistory`

Lancer le site `dataExtractor.html`, puis enregistrer votre dataset dans `/data`


## Google Cloud API
https://console.cloud.google.com/apis

## ID category videos
https://techpostplus.com/youtube-video-categories-list-faqs-and-solutions/



## Video List :
https://developers.google.com/youtube/v3/docs/videos/list?apix=true#usage

## Chart brush and zoom :
https://bl.ocks.org/EfratVil/92f894ac0ba265192411e73f633a3e2f
