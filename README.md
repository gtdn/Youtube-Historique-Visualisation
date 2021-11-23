# Projet de visualisation de l'historique Youtube

### Pour tester la visualisation sur vos donnés 

#### Etape 1 - Récupérer votre historique Youtube
1.  Go to http://google.com/takeout
1.  Select "deselect all" at the top
1.  Scroll to bottom and select "YouTube and YouTube Music"
1.  Then select "All YouTube data included" underneath the "YouTube and YouTube Music" option
1.  Select "deselect all" (again) inside this popup
1.  Select "history", then "ok"
1.  Select "Next step", leave "export once" selected
1.  Leave .zip selected and 2GB selected (the download will only be a few MB)
1.  You may have to check your email to verify you requested this takeout (I had too)
1.  The download should be ready in a few minutes, refresh the page at https://takeout.google.com/ and you will see a "Download" button


#### Etape 2 - Mapper vos historiques avec les informations sur chaque vidéos
Lancer un serveur python dans le dossier git
> `python3  http.server 8000`

Enregistrer votre historique Youtube récupéré à l'étape 1 dans `/data/history`

Modifier le fichier `dataExtractor.html` et changer le chemin avec `/data/history/yourdatahistory` 

Lancer le site `dataExtractor.html`, puis enregistrer votre dataset dans `/data`


## Google Cloud API 
https://console.cloud.google.com/apis

## ID category videos
https://techpostplus.com/youtube-video-categories-list-faqs-and-solutions/



## Video List : 
https://developers.google.com/youtube/v3/docs/videos/list?apix=true#usage
