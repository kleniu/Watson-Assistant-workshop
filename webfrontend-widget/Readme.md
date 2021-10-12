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