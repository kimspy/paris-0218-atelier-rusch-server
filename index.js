const express = require('express')
const fs = require('fs')
const util = require('util')
const path = require('path')
const app = express()
// const db = require('./db')
// const articles = require('./mocks/articles.json')
const readFile = util.promisify(fs.readFile)
const filePath = path.join(__dirname, './mocks/articles.json')

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', request.headers.origin)
  response.header('Access-Control-Allow-Credentials', 'true') // important
  response.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE') // important
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/article', (request, response, next) => {
  readFile(filePath, 'utf8')
  .then(data => {
    const articles = JSON.parse(data)
    response.json(articles)
  })
  .catch(next)

  // readFile(filePath, 'utf8')
  //   .then(JSON.parse)
  //   .then(article => response.json(article))
})

app.listen(3003, () => console.log('Oh oui, je suis connecté au port 3003!!! YEAH!!! C\'est tellement bon!! C\'est une expérience incomparable!!'))
