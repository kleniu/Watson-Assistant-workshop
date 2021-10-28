## Przykłądy wywołań
Kika komend (uwielbiam CLI i REST) :)

Zakładam, ze zgodnie z konfiguracją w manifest.yml deployment zrobiłeś do CLoudFoudry w IBM Cloud pod nazwą "webhook-restapi-server". Jezeli się nie mylę to funkcje REST API dostępne są pod URI `https://webhook-restapi-server.eu-de.mybluemix.net/api`. 
```
## pobierz wszystkie zlecenia
curl -X POST -H 'Content-Type: application/json' -d '{"action":"getall"}' https://webhook-restapi-server.eu-de.mybluemix.net/api | jq

## pobierz pojedyncze zlecenie idendyfikowane przez klucz: email:data
curl -X POST -H 'Content-Type: application/json' -d '{"action":"getbydateandemail", "email":"rafal@agro.eu", "date":"2021-10-11"}' https://webhook-restapi-server.eu-de.mybluemix.net/api | jq

## zmień status zlecenia identyfikowanego przez klucz: email:data na "anulowano"
curl -X POST -H 'Content-Type: application/json' -d '{"action":"abortdelivery", "email":"rafal@agro.eu", "date":"2021-10-11"}' https://webhook-restapi-server.eu-de.mybluemix.net/api | jq

## dane o zleceniach trzymane są w pamięci :) przywróć dane oryginalne
curl -X POST -H 'Content-Type: application/json' -d '{"action":"restart"}' https://webhook-restapi-server.eu-de.mybluemix.net/api | jq
```

## Przepis na uruchomienie serwera REST w Internecie
Uywając najprostrzego narzędzia jakim jest CloudFoundry.

1. Zaloguj się i ustaw środowisko
```
ibmcloud login --sso
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
