const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const fs = require('fs')
const path = require('path');
const app = express();

// Connect to database
connectDB();

app.use(cors());


app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'../client/build' )))
  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname,'../', 'client', 'build', 'index.html')))
}


app.listen(port, console.log(`Server running on port ${port}`));
