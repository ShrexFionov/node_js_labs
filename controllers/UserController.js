import {User} from '../models.js'
import path from 'path'
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

function getToken(id,email,role){
    return jwt.sign({id,email,role},process.env.JWT_SECRET,{expiresIn: '12h'})
}

class UserController{

    async registration(req,res,next){
        console.log(req.body)
        
        const visiter = await User.findOne({where:{email: req.body.email}})
        console.log(visiter)
        if (visiter) {
            const e = new Error('Пользователь с таким Email уже зареган!')
            e.status = 400
            return next(e)
        }
        
        const hash_password = await bcrypt.hash(req.body.password, 3)

        const new_body = { ...req.body }
        new_body['password'] = hash_password
        new_body['role'] = 'USER'
        new_body['activated'] = false
        const crypt_em = await bcrypt.hash(req.body.email, 3)
        const activationLink = v4()
        new_body['activationLink'] = activationLink
        if (!new_body.first_name || !new_body.last_name ||!new_body.password ||!new_body.email){
            const e = new Error('Необходимо заполнить все недостающие поля!')
            e.status = 400
            return next(e)
        }
        if (!req.files) {
            const e = new Error('Необходимо заполнить все недостающие поля!')
            e.status = 400
            return next(e)
        }
        const {photo} = req.files
        const photo_name = v4() + photo.name
        photo.mv(path.resolve(path.resolve(), 'uploads', photo_name))
        new_body['avatar'] = '/uploads/' + photo_name
        
        const user = await User.create(new_body) 
        const token = getToken(user.id, user.email, user.role)
        const link = `${process.env.API_HOST}:${process.env.API_PORT}/api/activate/${activationLink}`
        return res.status(200).json(link)
    }

    async activate(req,res,next){
        console.log(req.params)
        const { link } = req.params
        const user = await User.findOne({where: {activationLink:link} })
        if (user){
            user.isActivated = true
            user.activationLink = null
            await user.save()
            const token = getToken(user.id, user.email, user.role)
            return res.status(200).json(token)
        }
        const e = new Error('Некорректная ссылка!')
        e.status = 400
        return next(e)
    }

    async login(req,res,next){
        console.log(req.body)
        const {email,password} = req.body
        if (!email || !password){
            const e = new Error('Неверный логин или пароль!')
            e.status = 400
            return next(e)
        }

        const visiter = await User.findOne({where:{email: email}})
        console.log(visiter)
        if (!visiter) {
            const e = new Error('Пользователь с таким Email не зарегистрирован!')
            e.status = 400
            return next(e)
        }

        const sravn = bcrypt.compareSync(password, visiter.password)
        if (!sravn){
            const e = new Error('Неверный логин или пароль!')
            e.status = 400
            return next(e)
        }

        const token = getToken(visiter.id, visiter.email, visiter.role)
        return res.status(200).json(token)
    }

    async create(req,res,next){
        console.log(req.body)
        
        const new_body = { ...req.body };
        
        if (!new_body.first_name || !new_body.last_name ||!new_body.password ||!new_body.email){
            const e = new Error('Необходимо заполнить все недостающие поля!')
            e.status = 400
            return next(e)
        }
        
        if (!req.files) {
            const e = new Error('Необходимо заполнить все недостающие поля!')
            e.status = 400
            return next(e)
        }
        const {photo} = req.files
        const photo_name = v4() + photo.name
        photo.mv(path.resolve(path.resolve(), 'uploads', photo_name))
        new_body['avatar'] = '/uploads/' + photo_name
        
        const user = await User.create(new_body) 
        return res.status(201).json(user)
    }
    async get_all(req,res){
        console.log(req.params)
        const user = await User.findAll()
        if (user.length>0){
            return res.status(200).json(user)
        }
        const message = "Пользователи не найдены"
        return res.status(404).json(message)
    }
    async get(req,res){
        console.log(req.params)
        const user_id = req.params.id
        const user = await User.findByPk(user_id)
        if (user){
            return res.status(200).json(user)
        }
        const message = "Пользователь с id <<"+user_id+">> не найден"
        return res.status(404).json(message)
    }
    async update(req,res){
        console.log(req.params)
        const user_id = req.params.id
        const user = await User.findByPk(user_id)
        if (user){
            await user.update(req.body)
            return res.status(200).json(user)
        }
        const message = "Пользователь с id <<"+user_id+">> не найден"
        return res.status(404).json(message)
    }
    async delete(req,res){
        console.log(req.params)
        const user_id = req.params.id
        const user = await User.findByPk(user_id)
        if (user){
            await user.destroy(user_id)
            const message = "Пользователь с id <<"+user_id+">> успешно удалён"
            return res.status(200).json(message)
        }
        const message = "Пользователь с id <<"+user_id+">> не найден"
        return res.status(404).json(message)
    }
}

export default new UserController()