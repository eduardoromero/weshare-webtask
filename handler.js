const bodyParser = require('body-parser')
const express = require('express')
const Webtask = require('webtask-tools')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// pass RethinkDB around xD
app.use((req, res, next) => {
  req.db = require('rethinkdbdash')({
    db: 'weshare',
    servers: [{host: req.webtaskContext.secrets.RETHINKDB_SERVER, port: 28015}]
  })

  next()
})

app.get('/', (req, res, next) => {
  let _offset = parseInt(req.query.offset) || 0
  let _limit = parseInt(req.query.limit) || 10

  // max per page
  if (_limit > 100) {
    _limit = 100
  }

  req.db.table('shares').filter({}).skip(_offset).limit(_limit)
     .then((response) => {
       res.status(200).send({
         data: response
       })
     })
     .catch(error => res.status(500).json({error}))
})

app.get('/:id', (req, res, next) => {
  const id = req.params.id

  req.db.table('shares').get(id)
     .then((response) => {
       res.status(200).json({
         data: response
       })
     })
     .catch(error => res.status(500).json({error}))
})

app.post('/', (req, res) => {
  let data = req.body

  updateData('POST', req.db, data)
    .then((result) => res.status(200).json(result))
    .catch(error => res.status(500).json({error}))
})

app.put('/', (req, res) => {
  let data = req.body

  updateData('PUT', req.db, data)
    .then((result) => res.status(200).json(result))
    .catch(error => res.status(500).json({error}))
})

app.delete('/:id', (req, res, next) => {
  const id = req.params.id

  removeData(req.db, id)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch(error => res.status(500).send({error}))
})

const updateData = (method = 'POST', db, data) => {
  let conflicts = false

  if (method === 'POST') {
    conflicts = 'update'
  }

  return db.table('shares')
           .insert(data, {conflicts, returnChanges: true})
           .then(response =>
             ({
               'data': Array.isArray(data) ? response.changes.map(item => item.new_val) : response.changes[0].new_val,
               response
             })
           )
}

const removeData = (db, id) => {
  return db.table('shares').get(id).delete()
}

/** HELPERS **/
// TODO: Remove the following. For testing that our ENV is properly set.
app.get('/secrets', (req, res) => {
  res.status(200).json(req.webtaskContext.secrets)
})
app.use('/test', (req, res) => {
  res.status(200).json({
    body: req.body,
    type: typeof req.body,
    isArray: Array.isArray(req.body),
    params: req.params,
    query: req.query
  })
})

module.exports = Webtask.fromExpress(app)
