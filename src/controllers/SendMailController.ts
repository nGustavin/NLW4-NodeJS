import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../repositories/SurveysRepository'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { UsersRepository } from '../repositories/UsersRepository'
import SendMailService from '../services/SendMailService'

export default {
  async execute(req: Request, res: Response){
    const { email, survey_id } = req.body

    const usersRepository = getCustomRepository(UsersRepository)
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const userAlreadyExists = await usersRepository.findOneOrFail({ email })

    if(!userAlreadyExists){
      return res.status(400).json({error: "User does not exist"})
    }

    const surveyAlreadyExists = await surveysRepository.findOneOrFail({ id: survey_id })

    if(!surveyAlreadyExists){
      return res.status(400).json({error: "Survey does not exist"})
    }

    const surveyUser = await surveysUsersRepository.create({
      user_id: userAlreadyExists.id,
      survey_id
    })

    await surveysUsersRepository.save(surveyUser)

    await SendMailService.execute(email, surveyAlreadyExists.title, surveyAlreadyExists.description)

    return res.json(surveyUser)
  }, 

  async listMail(req: Request, res: Response){
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveys = await surveysUsersRepository.find();

    return res.status(200).json(surveys)
  }
}