import {Request, Response} from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
export default {
  async execute(req: Request, res: Response){
    
    const { survey_id } = req.params

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveysUsers = await surveysUsersRepository.find({
      survey_id
    })

    const detractor = surveysUsers.filter(survey => 
      (survey.value >= 0 && survey.value <= 6))
  }
}