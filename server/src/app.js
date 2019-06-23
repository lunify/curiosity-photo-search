var express = require('express')
var morgan = require('morgan')
var port = 3001

var app = express()

app.use(express.json())
app.use(morgan('combined'))

app.listen(port)

app.get('/', function handle(req, res) {
  res.json({ message: 'Hello world' })
})
