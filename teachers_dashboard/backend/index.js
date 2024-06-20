// Create express app
const exp = require('express')
const app = exp()

// Environment variables for secrecy
require('dotenv').config()

// To parse body of request
app.use(exp.json())

// Importing database
const mongodb = require('mongodb').MongoClient

// Deploying react build to this server
const path = require('path')
app.use(exp.static(path.join(__dirname, '../client/build')))

// Database connection
mongodb.connect(process.env.DB_URL)
  .then(client => {
    const vistadb = client.db('techno-vista')
    const labs = vistadb.collection('labs')
    const activity = vistadb.collection('activity')
    app.set('labs', labs)
    app.set('activity', activity)
    console.log("DB connection established")
  })
  .catch(err => console.log("Error in DB", err))

// Sending reqs to api.js
const api = require('./api')
app.use(api)

// Handling page refresh
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

// Error handling
app.use((err, req, res, next) => {
  res.send({ message: "Error occured", payload: err.message })
})

// Port from .env
let port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening in on ${port}`))