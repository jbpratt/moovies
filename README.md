# jbpratt.me

Compile a watch list with basic voting, eventually extend for content reviews.

> This is a MERN stack application using Passport.js for authentication, bcrypt.js for hashing. The front end queries TMDB's REST api, and Anilist's GraphQL api.

## Setup

```
npm install

cd client/
npm install

cd ..
npm start dev
```

###### Navigate to http://localhost:3000/ for the client.

###### The server is running on http://localhost:5000/

## For Development:

Create a file config/keys.js

```
module.exports = {
  mongoURI: <mongoURI>,
  secretOrKey: <secret>
};
```
