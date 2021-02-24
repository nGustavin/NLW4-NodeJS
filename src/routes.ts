import {Router } from 'express'
import surveysController from './controllers/SurveysController'
import usersController from './controllers/UsersController'

const routes = Router()

routes.post('/users', usersController.create)
routes.get('/users', usersController.index)
routes.get('/users/:id', usersController.show)
routes.post('/surveys', surveysController.create)

export default routes