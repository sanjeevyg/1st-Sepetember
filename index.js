const express = require('express');
const app = express()
const cors = require('cors')
const port = 7000

const knex = require('knex')

const connection = require('./knexfile.js')['development']

const database = knex(connection)


app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})

app.get('/yogi', (request, response) => {
    response.send({name: "Yogi"})
})

app.get('/', (request, response) => {

    database('student')
        .select()
        .then(result => {
            response.json({result})
        })
})

app.post('/students', (request, response) => {
    const student = request.body
    database('student')
        .insert(student)
        .select()
        .then(student => {
            response.json(student)
        })
})



//initdb /usr/local/var/postgres -E utf8
//pg_ctl -D /usr/local/var/postgress -l logfile start