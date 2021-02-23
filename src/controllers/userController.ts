import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import User from '../models/user'

export default {
  async create(req: Request, res: Response){
    const { name, email } = req.body

    const userRepository = getRepository(User)

    const newUser = userRepository.create({name, email})

    const userAlreadyExists = await userRepository.findOne({ email })

    if(userAlreadyExists !== undefined){
      res.status(400).json({Message: `User with email ${email} already exists`})
    }else{
      const users = await userRepository.save(newUser)
      res.status(200).json({message: `Usuario ${name} criado com sucesso!`, users})
    }
  },

  async index(req: Request, res: Response){
    const userRepository = getRepository(User)

    const users = await userRepository.find()

    res.status(200).json(users)
  }
}