var express = require('express')
var cors = require('cors')
var morgan = require('morgan')
var { port, nasaAPI } = require('./config')

var app = express()
app.use(express.json()).use(cors()).use(morgan('combined'))

app.listen(port)

app.get('/', function sendGreetings(req, res) {
  res.send({ message: 'Hello world' })
})

var axios = require('axios')
var url = require('url')

app.post('/', validateParams, requestPhotos)


// ******************************************

function validateParams(req, res, next) {
  var { query } = url.parse(req.url, true)

  if (!query.sol || !query.camera) {
    return res.status(400).send({ message: 'Missing query param' })
  }

  if (Object.is(NaN, Number(query.sol)) || !Number.isInteger(Number(query.sol)) || query.sol < 0) {
    return res.status(400).send({ message: 'Invalid sol value.' })
  }

  next()
}

function requestPhotos(req, res) {
  var { query } = url.parse(req.url, true)
  axios.get(`${nasaAPI.baseURL}?sol=${query.sol}&camera=${query.camera}&api_key=${nasaAPI.key}`)
  .then(sendPhotoUrls)
  .catch(sendError)


  // *******************************
  function sendError(err) {
    res.status(500).send(err)
  }

  function sendPhotoUrls({ data }) {
    res.send({ photoUrls: data.photos.map(getUrl) })
  }
}

function getUrl(photo) {
  return photo.img_src
}