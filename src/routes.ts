import {Router } from 'express'
import surveysController from './controllers/SurveysController'
import usersController from './controllers/UsersController'
import mailController from './controllers/SendMailController'
import answerController from './controllers/AnswerController'

const routes = Router()

routes.post('/users', usersController.create)
routes.get('/users', usersController.index)
routes.get('/users/:id', usersController.show)

routes.post('/surveys', surveysController.create)
routes.get('/surveys', surveysController.index)

routes.post('/sendMail' , mailController.execute)
routes.get('/sendMail' , mailController.listMail)

routes.get('/answers/:value', answerController.execute)

export default routes