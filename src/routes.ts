import {Router } from 'express'
import userController from './controllers/userController'

const routes = Router()

routes.post('/users', userController.create)
routes.get('/users', userController.index)

export default routes