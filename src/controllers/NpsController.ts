import {Request, Response} from 'express'
import { getCustomRepository, IsNull, Not } from 'typeorm'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
export default {
  async execute(req: Request, res: Response){
    
    const { survey_id } = req.params

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    })

    const detractor = surveysUsers.filter(survey => 
      (survey.value >= 0 && survey.value <= 6)).length
  
    const promoter = surveysUsers.filter(survey =>
      (survey.value >= 9 && survey.value <= 10)).length
      
    const passive = surveysUsers.filter(survey =>
      (survey.value >= 7 && survey.value <= 8)).length

    const totalAnswers = surveysUsers.length

    const calculate = ((promoter - detractor) / totalAnswers) * 100

    return res.json({
      detractor,
      promoter,
      passive,
      nps: `${calculate}%`,
    })
    
  }
}