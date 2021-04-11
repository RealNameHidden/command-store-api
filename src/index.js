
require('dotenv').config()
const express = require('express')
var cors = require('cors')
const db = require('./db/connection.js')
const Command = require('./models/command.js')
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT
const app = express()

const publicDirectory = path.join(__dirname, '../public')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static(publicDirectory))

app.get('', (req,res) => {
    res.render(index).status(200)
})

app.post('/add_command', (req, res) => {
    try {
        const command = new Command(req.body)
        command.save()
        res.send(command).status(201)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

app.get('/get_all', async (req, res) => {
    try {
        let result = await Command.find({})
        res.send(
            result.map(doc => {
                return { id:doc._id, name: doc.name, command: doc.command }
            })).status(201)
    } catch (e) {
        res.status(400).send(e.message)
    }
})
app.delete('/remove/:id', async (req, res) => {
    try {
            let command = await Command.findOne({_id:req.params['id']}) 
            command.remove()
            if(!command){
                req.send("Error:command not found").status(404);
            }
            res.send(command).status(201)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})