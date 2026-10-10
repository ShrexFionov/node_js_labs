import {Order, OrderItems, Product} from '../models.js'

class OrderItemsController{
    async create(req,res){
        console.log(req.body)
        const find_order = await Order.findByPk(req.body.orderId)
        const find_product = await Product.findByPk(req.body.productId)
        if (find_order !== null && find_product !== null){
            const order_items = await OrderItems.create(req.body) 
            return res.status(201).json(order_items)
        }
        var message = ""
        if(find_order === null){
            message += "Указаный заказ не найден "
        }
        if(find_product === null){
            message += "Указаный продукт не найден "
        }
        return res.status(404).json(message)
    }
    async get_all(req,res){
        console.log(req.params)
        const order_items = await OrderItems.findAll()
        if (order_items.length>0){
            return res.status(200).json(order_items)
        }
        const message = "Товары к заказу не найдены"
        return res.status(404).json(message)
    }
    async get(req,res){
        console.log(req.params)
        const order_items_id = req.params.id
        const order_items = await OrderItems.findByPk(order_items_id)
        if (order_items){
            return res.status(200).json(order_items)
        }
        const message = "Товар с id <<"+order_items_id+">> к заказу не найден"
        return res.status(404).json(message)
    }
    async update(req,res){
        console.log(req.params)
        const order_items_id = req.params.id
        const order_items = await OrderItems.findByPk(order_items_id)
        if (order_items){
            const find_order = await Order.findByPk(req.body.orderId)
            const find_product = await Product.findByPk(req.body.productId)
            if (find_order !== null && find_product !== null){
                await order_items.update(req.body)
                return res.status(200).json(order_items)
            }
            var message = ""
            if(find_order === null){
                message += "Указаный заказ не найден "
            }
            if(find_product === null){
                message += "Указаный продукт не найден "
            }
            return res.status(404).json(message)
        }
        var message = "Товар с id <<"+order_items_id+">> к заказу не найден"
        return res.status(404).json(message)
    }
    async delete(req,res){
        console.log(req.params)
        const order_items_id = req.params.id
        const order_items = await OrderItems.findByPk(order_items_id)
        if (order_items){
            await order_items.destroy(order_items_id)
            const message = "Заказ с id <<"+order_items_id+">> к заказу успешно удалён"
            return res.status(200).json(message)
        }
        const message = "Товар с id <<"+order_items_id+">> к заказу не найден"
        return res.status(404).json(message)
    }
}

export default new OrderItemsController()