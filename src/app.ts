import 'reflect-metadata'
import express from 'express'
import './database'
import routes from './routes'

export const app = express()

app.get('/', (req, res) =>{
    return res.json({message: "Hello World"})
})

app.use(express.json())
app.use(routes)