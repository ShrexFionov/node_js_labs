import {User} from '../models.js'

class UserController{
    async create(req,res){
        console.log(req.body)
        const user = await User.create(req.body) 

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