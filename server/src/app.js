var express = require('express')
var cors = require('cors')
var morgan = require('morgan')
var { port, nasaAPI } = require('./config')

var app = express()
app.use(express.json()).use(cors()).use(morgan('combined'))

var axios = require('axios')
app.post('/', validateParams, requestPhotos)

app.listen(port)


// ******************************************

function validateParams(req, res, next) {
  var { sol, camera } = req.body

  if (!sol || !camera) {
    return res.status(400).send({ message: 'Missing query param' })
  }

  if (Object.is(NaN, Number(sol)) || !Number.isInteger(Number(sol)) || sol < 0) {
    return res.status(400).send({ message: 'Invalid sol value.' })
  }

  next()
}

function requestPhotos(req, res) {
  var { sol, camera } = req.body
  
  axios.get(nasaAPI.baseURL, { params : { sol, camera, api_key: nasaAPI.key } })
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