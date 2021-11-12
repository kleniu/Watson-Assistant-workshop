# e-store order cancellation using Watson Assistant
This repository was prepared for the participants of the workshops conducted as part of the Warsaw edition of THINK 2021 and for the European participants of the webinar conducted as part of the Hybrid Cloud Build Team CEE.

## Repository content
```
├── LICENSE
├── README.md
├── skills
│   ├── skill-order-cancel-EN.json  // Watson Assistant skill for order cancelling in Emglish
│   └── skill-order-cancel-PL.json  // Watson Assistant skill in Polsh
├── webfrontend-widget              // The example static page for embedding Watson Assistant web widget
│   ├── Readme.md
│   ├── manifest.yml
│   └── src
│       ├── Staticfile
│       ├── images
│       │   └── newapp-icon.png
│       ├── index.html
│       └── stylesheets
│           └── style.css
└── webhook-restAPI-server          // The example Node.JS REST API service to be deployed in Cloud Foundry
    ├── Readme.md
    ├── app.js
    ├── manifest.yml
    ├── package-lock.json
    └── package.json

```