const { MongoClient, ServerApiVersion } = require('mongodb')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const express = require('express')
const app = express()
const TodoListRoutes = require('./routes/api/Todolist')

app.use(cors())
app.use(bodyParser.json())
app.use('./routes/api/Todolist', TodoListRoutes)

const uri = "mongodb+srv://devonhickle:Crowing33@cluster1.8nqhkve.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function run() {
  try {
    await client.connect()

    await client.db("admin").command({ ping: 1 })
    console.log('Successfully connected to MongoDB')
  } finally {
    await client.close()
  }
}

run().catch(console.dir)
