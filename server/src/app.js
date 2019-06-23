var express = require('express')
var morgan = require('morgan')
var { port, nasaAPI } = require('./config')

var app = express()
app.use(express.json()).use(morgan('combined'))

app.listen(port)

app.get('/', function sendGreetings(req, res) {
  res.send({ message: 'Hello world' })
})

var axios = require('axios')
var url = require('url')

app.post('/', requestPhotos)


// ******************************************

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