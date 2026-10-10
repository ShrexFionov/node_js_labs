import {Order, User} from '../models.js'

class OrderController{
    async create(req,res){
        console.log(req.body)

        const find_user = await User.findByPk(req.body.userId)
        if (find_user !== null){
            const order = await Order.create(req.body) 
            return res.status(201).json(order)
        }
        var message = ""
        if(find_user === null){
            message += "Указаный пользователь не найден "
        }
        return res.status(404).json(message)
    }
    async get_all(req,res){
        console.log(req.params)
        const order = await Order.findAll()
        if (order.length>0){
            return res.status(200).json(order)
        }
        const message = "Заказы не найдены"
        return res.status(404).json(message)
    }
    async get(req,res){
        console.log(req.params)
        const order_id = req.params.id
        const order = await Order.findByPk(order_id)
        if (order){
            return res.status(200).json(order)
        }
        const message = "Заказ с id <<"+order_id+">> не найден"
        return res.status(404).json(message)
    }
    async update(req,res){
        console.log(req.params)
        const order_id = req.params.id
        const order = await Order.findByPk(order_id)
        if (order){
            const find_user = await User.findByPk(req.body.userId)
            if (find_user !== null){
                await order.update(req.body)
                return res.status(200).json(order)
            }
            var message = ""
            if(find_user === null){
                message += "Указаный пользователь не найден "
            }
            return res.status(404).json(message)
            
        }
        var message = "Заказ с id <<"+order_id+">> не найден"
        return res.status(404).json(message)
    }
    async delete(req,res){
        console.log(req.params)
        const order_id = req.params.id
        const order = await Order.findByPk(order_id)
        if (order){
            await order.destroy(order_id)
            const message = "Заказ с id <<"+order_id+">> успешно удалён"
            return res.status(200).json(message)
        }
        const message = "Заказ с id <<"+order_id+">> не найден"
        return res.status(404).json(message)
    }
}

export default new OrderController()