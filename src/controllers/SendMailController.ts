import { Request, Response } from 'express'
import { resolve } from 'path'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../errors/AppErrors'
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


    const user = await usersRepository.findOneOrFail({ email })

    if(!user){
      throw new AppError("User does not exists!")
    }

    const survey = await surveysRepository.findOneOrFail({ id: survey_id })

    if(!survey){
      throw new AppError("Survey does not exists!")
    }

    


    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs")


    const surveyuser = await surveysUsersRepository.findOne({
      where: {user_id: user.id, value: null},
      relations: ["user", "survey"]
    })

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL
    }

    if(surveyuser){
      variables.id = surveyuser.id
      await SendMailService.execute(email, survey.title, variables, npsPath)
      return res.json(surveyuser)
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    })
    

    await surveysUsersRepository.save(surveyUser)

    variables.id = surveyUser.id

    await SendMailService.execute(email, survey.title, variables, npsPath)

    return res.json(surveyUser)
  }, 

  async listMail(req: Request, res: Response){
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveys = await surveysUsersRepository.find();

    return res.status(200).json(surveys)
  }
}