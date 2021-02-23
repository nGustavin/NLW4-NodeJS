import 'reflect-metadata'
import express from 'express'
import './database'

const app = express()

app.get('/', (req, res) =>{
    return res.json({message: "Hello World"})
})

app.use(express.json())
app.listen(3333)
