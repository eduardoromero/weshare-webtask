# weshare-webtask
A FaaS API for sharing documents. Built with WebTask.io, RethinkDB and the Serverless framework.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

## Running it with Serverless Framework

#### Get your credentials
```bash
sls config credentials --provider webtasks
```


#### Deploy / Run
```bash
npm install // or yarn
sls deploy
```

The result of `deploy` will be an URL you can use to consume your service.

#### Watching the Logs
```bash
sls logs 
```

## API Functions

### 𝒇 - `GET /`

- **Triggering event**:
  - **HTTP** 
  - **PATH**: `/`
  - **METHOD(S)**: `GET`
  
- **Environment variables (Secrets in WebTask.io)**:
  - `RETHINKDB_SERVER`: IP of the RethinkDB Server.
 
  
- **Pre-requisites:**
  - RethikDB: Database `weshare` and table `shares`.
 
### 𝒇 - `GET /:id`

- **Triggering event**:
  - **HTTP**
  - **PATH**: `/[:id]`
  - **METHOD(S)**: `GET`
   
 
- **Environment variables (Secrets in WebTask.io)**:
  - `RETHINKDB_SERVER`: IP of the RethinkDB Server.
 
  
- **Pre-requisites:**
  - RethikDB: Database `weshare` and table `shares`.



### 𝒇 - `POST /` and `PUT /`

- **Triggering event**:
  - **HTTP**
  - **PATH**: `/`
  - **METHOD(S)**: `POST` or `PUT`
   
 
- **Environment variables (Secrets in WebTask.io)**:
  - `RETHINKDB_SERVER`: IP of the RethinkDB Server.
 
  
- **Pre-requisites:**
  - RethikDB: Database `weshare` and table `shares`.
  
  
### 𝒇 - `DELETE /:id`

- **Triggering event**:
  - **HTTP**
  - **PATH**: `/[:id]`
  - **METHOD(S)**: `DELETE`
   
 
- **Environment variables (Secrets in WebTask.io)**:
  - `RETHINKDB_SERVER`: IP of the RethinkDB Server.
 
  
- **Pre-requisites:**
  - RethikDB: Database `weshare` and table `shares`.
