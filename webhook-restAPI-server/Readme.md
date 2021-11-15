## CURL call examples
A few commands (I love CLI and REST) :)

I assume that, according to the configuration in manifest.yml, you have done deployment to CLoudFoudry in IBM Cloud under the name "webhook-restapi-server". If I am right, the REST API functions are available under the URI `https://webhook-restapi-server.eu-de.mybluemix.net/api`. 

... and install `jq` - if you haven't installed it already, it's a really great tool. 
```
## get all orders
curl -X POST -H 'Content-Type: application/json' -d '{"action":"getall"}' https://webhook-restapi-server.eu-de.mybluemix.net/api | jq

## download a single order identified by a key: email:data
curl -X POST -H 'Content-Type: application/json' -d '{"action":"getbydateandemail", "email":"rafal@agro.eu", "date":"2021-10-11"}' https://webhook-restapi-server.eu-de.mybluemix.net/api | jq

## change the status of the order identified by the key: email:data na "canceled"
curl -X POST -H 'Content-Type: application/json' -d '{"action":"abortdelivery", "email":"rafal@agro.eu", "date":"2021-10-11"}' https://webhook-restapi-server.eu-de.mybluemix.net/api | jq

## orders data are kept in the memory :) restore original data
curl -X POST -H 'Content-Type: application/json' -d '{"action":"restart"}' https://webhook-restapi-server.eu-de.mybluemix.net/api | jq
```

## Recipe for running a REST server on the Internet using Cloud Foundry IBM Cloud service.
I'm using the simplest tool which is Cloud Foundry, but ... you can do exactely the same using all other types of computing environemnts available in the IBM Cloud like: Kubernetes, Openshift, Code Engine, Functions, VPC, VMware to name a few.

1. Log in and set the environment
```
ibmcloud login --sso
ibmcloud target -g default 
ibmcloud target --cf
```
2. (optionaly) Edit `manifest.yaml` and provide your unique name
3. Push the app to CF container
```
ibmcloud cf push -f manifest.yml
```
3. Check logs
```
ibmcloud cf logs webhook-restapi-server --recent
```
