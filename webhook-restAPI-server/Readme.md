## Deploying REST server using IBM Code Engine
1. Log in and set the environment
```
ibmcloud login --sso
```
set resource group (in our case it's "default")
```
ibmcloud target -g default 
```
(optionally, if not created) create project named "WA-workshop" in IBM Code Engine service
```
ibmcloud ce project create --name WA-workshop --endpoint public
```
(optionally, if not selected) select project named "WA-workshop" as the active one
```
ibmcloud ce project select --name WA-workshop
```
from now, all applications will be deployed in project "WA-workshop" namespace

2. Deploy the app

IMPORTANT! execute following command being inside the directory: webhook-restAPI-server

IMPORTANT! remove previous node_modules directory and package-lock.json file - it will be recreated in Code Engine
```
ibmcloud ce app create --name webhook-restapi-server --build-source . --strategy buildpacks --min 1 --max 1
```
3. set the RESTURL environment
```
RESTURL=`ibmcloud ce app list | grep webhook-restapi-server | awk '{print $3}'`
```
## Deploying REST server using IBM Cloud Foundry
1. Log in and set the environment
```
ibmcloud login --sso
```
```
ibmcloud target -g default 
```
```
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
4. set the RESTURL environment
```
RESTURL=webhook-restapi-server.eu-de.mybluemix.net
```
## CURL call examples

I assume that, according to the configuration in manifest.yml, you have done deployment to CloudFoudry in IBM Cloud under the name "webhook-restapi-server".

... and install `jq` - if you haven't installed it already, it's a really great tool. 

get all orders
```
curl -s -X POST -H 'Content-Type: application/json' -d '{"action":"getall"}' ${RESTURL}/api | jq
```
download a single order identified by a key: email:data
```
curl -s -X POST -H 'Content-Type: application/json' -d '{"action":"getbydateandemail", "email":"rafal@agro.eu", "date":"2021-10-11"}' ${RESTURL}/api | jq
```
change the status of the order identified by the key: email:data na "canceled"
```
curl -s -X POST -H 'Content-Type: application/json' -d '{"action":"abortdelivery", "email":"rafal@agro.eu", "date":"2021-10-11"}' ${RESTURL}/api | jq
```
orders data are kept in the memory :) restore original data
```
curl -s -X POST -H 'Content-Type: application/json' -d '{"action":"restart"}' ${RESTURL}/api | jq
```

## Recipe for running a REST server on the Internet using Cloud Foundry IBM Cloud and IBM Code Engine service.
I'm using the simplest tool which is Cloud Foundry, but ... you can do exactely the same using all other types of computing environemnts available in the IBM Cloud like: Kubernetes, Openshift, Functions, VPC, VMware to name a few.

