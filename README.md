# Basic Authentication and Authorization using Basic Auth and API keys

## TODO
Using a express framework, build an api inventory information. API should be able to:
* Create endpoint to create user
* Have some way to create admin and normal users
* Only normal users should be able to get inventory items
* Admin users should be able to create, update and delete items

Things to note:
* Ensure that when creating users, there are no duplicates username
* Use the proper status codes
* Use api key authentication
* Store data in a json file



## Installation
Use the package manager [npm](https://www.npmjs.com/);
```javascript
npm install
```

## Usage
```javascript
const express = require('express');
const server = express();
require('dotenv').config();
const { v4: uuid } = reqire('uuid');
const { format } = require('date-fns');
```

## Dependencies
* express - simpler way to manage and create our server.
* nodemon - to restart our server upon changes made to our app in real-time
* uuid - A Universally Unique Identifier a 128-bit label used to create our API keys
* date-fns - to manipulate javascript date in our node application.
* dotenv - a zero-dependency module that loads environment variables from a .env file into process.env

## Modules
* fs - Allows us to read/write files.
* path - Allows us to set paths to files/directory.