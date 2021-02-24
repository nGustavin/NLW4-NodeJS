import { getCustomRepository } from "typeorm"
import { SurveysRepository } from "../repositories/SurveysRepository"
import {Request, Response} from 'express'

export default {
  async create(req: Request, res: Response){

    const { title, description } = req.body

    const surveysRepo = getCustomRepository(SurveysRepository)

    const survey = surveysRepo.create({
      title,
      description
    })

    await surveysRepo.save(survey)

    return res.status(201).json(survey)
  }
}