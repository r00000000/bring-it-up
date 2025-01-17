// Import the express in typescript file
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
require('dotenv').config(".env");

// Initialize the express engine
const app: express.Application = express();

// Take a port 3000 for running server.
const port: number = 4000;

// setup cors to allow client http access
app.use(cors({
  origin: '*'
}))

// Routes

// Handling '/' Request
app.get('/', (_req, _res) => {
  // test data to serve
  const groceries = [
    {
      "id": "1",
      "item": "Cauliflower"
    },
    {
      "id": "2",
      "item": "Eggs"
    }
  ]
  _res.send(groceries);
});

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express http://localhost:${port}/`);
});

// connect to mdb
let dbStr: string = process.env.MONGO_DB_CONNECT_STR as string;
console.log(dbStr);

mongoose.connect(dbStr);
const db = mongoose.connection; 

// set up db to log on error
db.on('error', (error) => console.error(error));
db.on('open', (error) => console.log('Connected to Database'));

// let server accept json
app.use(express.json())
const councellingServicesRouter = require('./routes/counsellingService.api.ts')
// all url that starts with this route will use councellingServicesRouter
app.use('/counselling-services', councellingServicesRouter)