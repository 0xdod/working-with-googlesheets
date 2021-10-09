# Coding assessment task for an internship

The task is to build an api that pulls data from a given google sheets, parse it and save it into a database.

Task here https://docs.google.com/document/d/17eB0MrTax77UiWFovwyBJLjsaeb0hwPQkViyyP_9f8I/edit

The api exposes two endpoints.
- [GET] /gsheet -> To fetch and parse the data from the google sheet and save it into a database.
```bash
curl localhost:4000/gsheet
```
- [GET] /request -> To fetch the saved requests (buy or sell) from the database.
This endpoint supports pagination and requires the url parameter `r`, indicating what requests (buy or sell) to fetch from the db.
```bash
curl 'localhost:4000/request?r=buy&page=1&limit=10'
```


# Technical requirements
- Nodejs >=16.x.x
- MongoDB ~4.x.x
- A google developer account and API key

# Running locally
clone the repo, provide your API keys and supply env vars (listed in .env.example file). Run `yarn` to install the dependencies and `yarn start` to start the application. Make sure to have mongo atlas or a running local mongodb instance.

