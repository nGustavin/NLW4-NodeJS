import {Request, Response} from 'express'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../errors/AppErrors'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'

export default {

  // http://localhost:3333/answers/1?u=5d3167d2-313a-44a1-9ce7-d9c88922f456

  async execute(req: Request, res: Response){
    const { value } = req.params
    const { u } = req.query

    const surveysUserRepo = getCustomRepository(SurveysUsersRepository)

    const surveyUser = await surveysUserRepo.findOne({
      id: String(u)
    })

    if(!surveyUser){
      throw new AppError("Survey user does not exists!")
    }

    surveyUser.value = Number(value)

    await surveysUserRepo.save(surveyUser)

    return res.status(200).json(surveyUser)
  }
}