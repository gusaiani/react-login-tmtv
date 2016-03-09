'use strict'

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const app = new(require('express'))()
const port = 5000

const config = require('./webpack.config')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))
app.use(bodyParser.json())

app.post('/auth/getToken/', (req, res) => {
  if (req.body.password != 'password') {
    res.status(200)
      .json({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8'})
  } else {
    res.sendStatus(403)
  }
})

app.get('/getData/', (req, res) => {
  let token = req.headers['authorization']
  if (!token) {
    res.sendStatus(401)
  } else {
    try {
      let decoded = jwt.verify(token.replace('Bearer ', ''), 'secret-key')
      res.status(200)
        .json({data: 'Valid credentials found.'})
    } catch (e) {
      res.sendStatus(401)
    }
  }
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

app.listen((process.env.PORT || port), (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`)
  }
})
