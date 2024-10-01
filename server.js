const express = require('express')
const app = express()
require ('dotenv').config()
const mysql = require('mysql2')

const db = mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME
})

// Question 1
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients;'
  db.query(query, (error, data) => {
    if(error) {
      return res.status(404).send('Failed to fetch data: ' + error.message)
    }
    res.status(200).json(data)
  })
})

// Question 2
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers;'

  db.query(query, (err, results) => {
    if(err) {
      return res.status(404).send('Failed to fetch data: ' + err.message)
    }
    res.status(200).json(results)
  })
})

// Question 3

app.get('/filter', (req, res) => {
  const query = 'SELECT first_name FROM patients;'
  db.query(query, (error, data) => {
    if(error) {
      return res.status(404).send('Failed to fetch data: ' + error.message)
    }
    res.status(200).json(data)
  })
})

// Question 4
app.get('/specialty', (req, res) => {
  const query = 'SELECT provider_specialty FROM providers;'
  db.query(query, (error, data) => {
    if(error) {
      return res.status(404).send('Failed to fetch data: ' + error.message)
    }
    res.status(200).json(data)
  })
})

db.connect((err) => {
  if(err){
    return console.log('Error connecting to db: ', err)
  }
  console.log('database connected')
})




const port = process.env.PORT

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`)
})