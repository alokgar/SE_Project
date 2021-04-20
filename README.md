# IndustryAssist
It is a web application which fulfills the day-to-day requirement of Manufacturing Industries.This application aims at providing an efficient interface to the industry for managing their product  inventory based on each item sold/produced and help their marketing team with a simple and friendly way to create orders.

## Tech/framework used
- ReactJS
- Redux
- NodeJS
- ExpressJS
- MongoDB
- 
## Folder Desciption
- **Requirement and Designing Docs**
  - Docs - This folder contains the docs related the SRS, ERdiagram , Data flow diagram of the application.

- **Frontend** 
  - Client - This folder contains the frontend React application of our Web App.

- **Backend**
  - Config - This folder contains configuration file for connecting the backend with the database.
  - Middleware - This folder contains authentication middleware file to verify jwt token.
  - Models - This folder contains the database models that we used in our web App.
  - Route/Api -  This folder contains all the API's used  in the Application.
  - Test - This folder contains test file used to test the API's written.
  - Server.js - This file is the main file responsible for running the backend server.


## TO RUN THE WEB APP:
A) Goto https://aqueous-waters-81428.herokuapp.com/ 
B) Select Agent or Admin button to go to their respective login pages
C) In Agent: username: "5" password: "password"
D) In Office: username: "naman" password: "naman"

## TO RUN ON YOUR LOCAL MACHINE:
- Clone this repository on your local machine.
- Install Node.js and npm on your machine from here ( https://nodejs.org/en/download/ ). Check for the succesfull installation using the command -> node -v and npm -v.
- Open command prompt and change the directory to the cloned directory.
- Now install dependencies using - 
  - npm install  (in current folder)
  - npm install  (in client folder)
- Now, install Dev Dependencies (used to run backend and frontend concurrently)
  - npm i -D nodemon concurrently
- To run Back-end & Front-end concurrently :
  - npm run dev
- Now , Open your favourite browser and goto http://localhost:3000/.

- **Back-end Server  : http://localhost:5000**

- **Front-end Server : http://localhost:3000**


