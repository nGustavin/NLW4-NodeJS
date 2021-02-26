import { Request, Response } from 'express'
import { getCustomRepository, getRepository } from 'typeorm'
import User from '../models/user'
import { UsersRepository } from '../repositories/UsersRepository'

import * as yup from 'yup'
import { AppError } from '../errors/AppErrors'

export default {
  async create(req: Request, res: Response){

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    })

    try {
      await schema.validate(req.body, {abortEarly: false})
    } catch (err) {
      throw new AppError(err)
    }

    const { name, email } = req.body

    const userRepository = getCustomRepository(UsersRepository)

    const newUser = userRepository.create({name, email})

    const userAlreadyExists = await userRepository.findOne({ email })

    if(userAlreadyExists !== undefined){
      res.status(400).json({Message: `User with email ${email} already exists`})
    }else{
      const users = await userRepository.save(newUser)
      res.status(201).json({message: `Usuario ${name} criado com sucesso!`, users})
    }
  },

  async index(req: Request, res: Response){
    const userRepository = getCustomRepository(UsersRepository)

    const users = await userRepository.find()

    res.status(200).json(users)
  },

  async show(req: Request, res: Response){

    const {id} = req.params

    const userRepository = getRepository(User)

    const user = await userRepository.findOneOrFail(id)

    if(user === undefined){
      throw new AppError("User not found!")
    }else{
      res.status(200).json(user)
    }
  }
}