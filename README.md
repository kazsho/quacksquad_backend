# Tool Library API
This is back-end project that allows users to view and reserve a tool from the tool library.

This project has three key elements:

- An API that allows users to view tools and submit a reservation form. It also allows the staff members at the library to log in and add/update tools.
- A database storing the tool data

## Installation
- Clone the repo
- Open the project in your preferred code editor
- In your terminal, navigate to the directory where package.json is located
- Run "npm install" to install all the required libraries
- Create a .env file inside your folder, and add PORT, DB_URL and SALT_ROUNDS. You will need your own ElephantSQL database to connect to.

## Connect Database
- Run "npm run setup-db" to establish connection with your database and setup your data. 

## Run Server
- Run "npm run dev" to run your server in development mode.
- Run "npm start" to run the server.

## Remaining Bugs
- No remaining bugs detected at the time of writing this READme