# Hotel Room Management API

A hotel management system that can create rooms, edit rooms, fetch a created room, fetch all created rooms, add roles, add authentication and authorization middlewares, and a validation middle ware

## Based on the requirements requested, the following was satisfied:

- [x] Add Roles to the user model (guest and admin)
- [x] Add Authentication and Authorization middlewares, so that only the admin can add, edit and delete room types using bcrypt and jwt
- [x] Add a validation middleware to validate data before it gets to the authentication middleware using joi validator
- [x] Make joi validator as dynamic as possible

## How to run:

1. clone repository
2. cd into Home Directory
3. run npm init
4. run npm install express nodemon dotenv joi jsonwebtoken mongoose bcrypt
5. run npm run dev (for nodemon); this will accept changes and make updates to the api whilst still running OR
6. run npm run start (for node); to activate node on the indicated file
7. download postman or insomnia or dynamic client extension on VSCode
8. perform your requests

## main file: app.js

> This is my first node api, done to the best of my knowledge and I feel proud :tada: :rocket:
> More Loading...
