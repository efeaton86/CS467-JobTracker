# CS467-JobTrekker


## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Front End](#front-end)
  - [Back End](#back-end)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

In an environment where students apply to numerous internships/new grad positions, often exceeding fifty within a single application cycle, maintaining meticulous organization is imperative. To address this challenge, we embark on a mission to develop a Job Tracker web application tailored for Computer Science students. This web application will serve as an indispensable tool, empowering users to methodically monitor their internship and job hunting endeavors.
## Prerequisites

List any prerequisites that need to be installed or set up before running the project.

- Prerequisite 1
- Prerequisite 2
- Prerequisite 3

## Environment Variables
### 1. `DATABASE_URL`

- **Purpose/Description:** 
- **Example Value:** `postgres://username:password@localhost:5432/mydatabase`
- **Default Value:** None
- **Where to Set:** Set this variable in `.env` file 

### 2. `MONGO_CLUSTER_NAME`
### 3. `MONGO_PASSWORD`
### 4. `MONGO_USERNAME`
### 5. `MONGO_DBNAME`
### 6. `MONGO_URI`
### 7. ``
### 8. ``

## APP Configuration Settings


## Local Development Outside of Docker Containers
- To run the app for local development with hot reloads:
1. Change to server directory
```bash
cd server
```
2. Spin up the flask server
```bash
python3 -m app    
```
3. Open second terminal and change to client directory
```bash
cd client
```
4. Spin up React front end
```bash
yarn start
```


## Local Development with Docker Containers
- To run the app for local development with hot reloads:
```bash
    docker compose -f docker-compose-dev.yml up 
```

- To run the production build locally:
```bash
    docker compose -f docker-compose.yml up
```
