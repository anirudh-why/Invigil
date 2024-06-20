// Create mini express
const exp = require('express')
const app = exp.Router()

// Environment variables for secrecy
require('dotenv').config()

// To handle asynchronous errors
const expressAsyncHandler = require('express-async-handler')

// To encrypt and decrypt passwords
const bcryptjs = require('bcryptjs')

// To generate dynamic web tokens
const jwt = require('jsonwebtoken')
const verifyToken = require('./verifyToken')

// Middleware to get the user object
let labs;
app.use((req, res, next) => {
  labs = req.app.get('labs')
  activity = req.app.get('activity')
  next()
})

// Route to register
app.post('/register', expressAsyncHandler(async (req, res) => {
  let body = req.body
  const dbUser = await labs.findOne({ labnumber: body.labnumber })
  if (dbUser !== null)
    res.send({ message: "Lab already exists" })
  else {
    const hash = await bcryptjs.hash(body.password, 7)
    body.password = hash
    await labs.insertOne(body)
    res.send({ message: "Lab registered" })
  }
}))

// Route to login
app.post('/login', expressAsyncHandler(async (req, res) => {
  const user = req.body
  const dbUser = await labs.findOne({ labnumber: user.labnumber })
  if (dbUser === null)
    res.send({ message: "Invalid labnumber" })
  else {
    const status = await bcryptjs.compare(user.password, dbUser.password)
    if (status === false)
      res.send({ message: "Invalid password" })
    else {
      const signedToken = jwt.sign({ labnumber: dbUser.labnumber }, process.env.SECRET_KEY, { expiresIn: '1d' })
      res.send({ message: "Login successful", token: signedToken, user: dbUser })
    }
  }
}))

// Route to get labs
app.get('/labs/:id', verifyToken, expressAsyncHandler(async (req, res) => {
  let id = req.params.id
  console.log(id)
  const labList = await labs.find({ labnumber: id }).toArray()
  res.send({ message: "Labs List", payload: labList })
}))

// Route to add instances
app.post('/instance', verifyToken, expressAsyncHandler(async (req, res) => {
  const body = req.body
  await activity.insertOne(body)
  res.send({ message: "New instance created" })
}))

// Route to get user logs
app.get('/users/:id', verifyToken, expressAsyncHandler(async (req, res) => {
  let value = req.params.id
  const logList = await activity.find({ code: value }).toArray()
  console.log(logList)
  res.send({ message: "Log List", payload: logList })
}))

// Route to add codes to set
app.put('/code/:id', verifyToken, expressAsyncHandler(async (req, res) => {
  let value = req.params.id
  let bosy = req.body
  let result = await labs.updateOne({ labnumber: value }, { $addToSet: { exams: { code: bosy.code, date: bosy.date } } })
  res.send({ message: "Code added" })
}))

// Export app
module.exports = app