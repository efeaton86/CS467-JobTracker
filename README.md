# CS467-JobTracker

In an environment where students apply to numerous internships/new grad positions, often exceeding fifty within a single application cycle, maintaining meticulous organization is imperative. To address this challenge, we embark on a mission to develop a Job Tracker web application tailored for Computer Science students. This web application will serve as an indispensable tool, empowering users to methodically monitor their internship and job hunting endeavors.

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

Provide an introduction to your project. Explain what it does and why it's useful.

## Prerequisites

List any prerequisites that need to be installed or set up before running the project.

- Prerequisite 1
- Prerequisite 2
- Prerequisite 3

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
