# POST CODE REST API (REACT FRONTEND)

- This is the frontend of Postcode API that utilizes Spring security to securely retrieve and add new postcodes to the database.
- Postcode API backend: https://github.com/Mariya-ghafoor/postcodeAPI-backend

## Purpose

- To provide a way to communicate with the REST API to securely perform CRUD operations on MySql database

## Design goals

- To build a simple interface for the API

## Pages

### Home

- Home page consists of the following three options for the user to interact with the API:
  - View all postcodes (no login required)
  - Retrieve postcodes through postcode number or suburb (no login required)
  - Add new postcodes (login required)

### Register

- If the user wishes to add a new postcode they should either register or if already registered then they must login
- To register unique username, email and a 6 digit password is required
- If the registration is successful then the server sends a JWT which is saved as a cookie in the user's hard drive (more about cookies later)

### Login

- If the user has already registered then they must login to receieve JWT from the server

### Add Postcodes

- If the register/login are successful then the user is automatically redirected to an add to postcodes page
- To add a new postcode they must provide a postcode number of 4 digits and a suburb name

## Handling JWTs

- The API uses JWTs to securely allow users to make POST requests to the database.
- The JWTs are stored as a cookie on user's computer.
- When user logs out the cookies expiration date is changed to the time now and so the cookie expires.
- This will then prompt the user to login again if they want to add postcodes.

## Future Goals

- [ ] Deploy on cloud
