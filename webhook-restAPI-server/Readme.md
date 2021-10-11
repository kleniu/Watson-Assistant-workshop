## Przykłądy wywołań
Kika komend (uwielbiam CLI i REST) :)
```
curl -X POST -H 'Content-Type: application/json' -d '{"id":"JSI243"}' http://localhost:8080/getbyid
curl -X POST -H 'Content-Type: application/json' -d '{"email":"robert@test.pl", "date":"21/09/2021"}' http://localhost:8080/getbydateandemail
```

## Przepis na uruchomienie serwera REST w Internecie
Uywając najprostrzego narzędzia jakim jest CloudFoundry.

1. Zaloguj się i ustaw środowisko
```
ibmcloud cf login --sso
ibmcloud target -g default 
ibmcloud target --cf
```
2. Uruchmom aplikacje w CloudFoundry
```
ibmcloud cf push -f manifest.yml
```
3. Sprawdź logi
```
ibmcloud cf logs webhook-restapi-server --recent
```
