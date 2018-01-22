const mysql = require('mysql')
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')

try {
  const db = mysql.createConnection(config.db)
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  app.get('/test', (req, res) => {
    db.query('select 1+1', (error, results) => {
      if (error) return res.status(500).json({type: 'error', error})
      res.json({type: 'success', message: 'Test OK', results})
    })
  })

  app.listen(config.port)
  console.log('App is running on port ' + config.port)
} catch (e) {
  process.exit(1)
}
