const express = require('express');
const app = express()
const cors = require('cors')
const port = 7000
const bcrypt = require('bcrypt')

const knex = require('knex')

const connection = require('./knexfile.js')['development'];
const { request } = require('express');

const database = knex(connection)




app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})

app.get('/yogi', (request, response) => {
    response.send({name: "Yogi"})
})

app.get('/students', (request, response) => {
    database('student')
        .select()
        .then(result => {
            response.json(result)
        })
})

app.post('/students', (request, response) => {
    const student = request.body
    database('student')
        .insert(student)
        .returning('*')
        .then(student => {
            response.json({student})
        }).catch(error => {
            console.error({error: error.message})
        })
})

app.get('/students/:id', (request, response) => {
    const id = request.params.id
    // console.log(request.params)
    database('student')
        .select().where({id: id}).first()
        .then(student => {
            response.json({student})
        }).catch(error => {
            console.error({error: error.message})
        })
})


app.patch('/students/:id', (request, response) => {
    const id = request.params.id
    const student = request.body 

    database('student')
        .select()
        .where({id: id})
        .update(student)
        .returning("*")
        .then(student => {
            response.json({student})
        }).catch(error => {
            console.error({error: error.message})
        })
})

app.delete('/students/:id', (request, response) => {
    const id = request.params.id 
    database('student')
        .where({id: id})
        .delete()
        .then(() => {
            response.json({message: `student with ${id} is deleted! `})
        })
})


app.post('/user', (request, response) => {
    bcrypt.hash(request.body.password, 20, (error, hasedPassword) => {
        database('user')
            .insert({
                username: request.body.username,
                hased_password: hasedPassword
            })
            .returning('*')
            .then(user => {
                response.json({user})
            }).catch(error => {
                console.error({error: error.message})
            })
})



//initdb /usr/local/var/postgres -E utf8
//pg_ctl -D /usr/local/var/postgress -l logfile start