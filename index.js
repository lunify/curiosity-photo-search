var express = require('express')
var path = require('path')
var cors = require('cors')
var morgan = require('morgan')
var { port, nasaAPI } = require('./config')

var app = express()

app.use(express.json()).use(cors()).use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'client/build')));

var axios = require('axios')
app.post('/api/search', validateParams, requestPhotos)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port)

// ******************************************

function validateParams(req, res, next) {
  var { camera, sol } = req.body
  if (!camera || !sol) {
    return res.status(400).send({ message: 'Missing query param' })
  }

  if (Object.is(NaN, Number(sol)) || !Number.isInteger(Number(sol)) || sol < 0) {
    return res.status(400).send({ message: 'Invalid sol value.' })
  }

  next()
}

function requestPhotos(req, res) {
  var { camera, sol } = req.body
  axios.get(`${nasaAPI.baseURL}?sol=${sol}&camera=${camera}&api_key=${nasaAPI.key}`)
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