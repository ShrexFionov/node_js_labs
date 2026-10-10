import {Product, Category} from '../models.js'

class ProductController{
    async create(req,res){
        console.log(req.body)
        const find_category = await Category.findByPk(req.body.categoryId)

        if (find_category !== null){
            const product = await Product.create(req.body) 
            return res.status(201).json(product)
        }
        var message = ""
        if(find_category === null){
            message += "Указаная категория не найдена "
        }
        return res.status(404).json(message)
    }
    async get_all(req,res){
        console.log(req.params)
        const product = await Product.findAll()
        if (product.length>0){
            return res.status(200).json(product)
        }
        const message = "Продукты не найдены"
        return res.status(404).json(message)
    }
    async get(req,res){
        console.log(req.params)
        const product_id = req.params.id
        const product = await Product.findByPk(product_id)
        if (product){
            return res.status(200).json(product)
        }
        const message = "Продукт с id <<"+product_id+">> к заказу не найден"
        return res.status(404).json(message)
    }
    async update(req,res){
        console.log(req.params)
        const product_id = req.params.id
        const product = await Product.findByPk(product_id)
        if (product){
            const find_category = await Category.findByPk(req.body.categoryId)

            if (find_category !== null){
                await product.update(req.body)
                return res.status(200).json(product)
            }
            var message = ""
            if(find_category === null){
                message += "Указаная категория не найдена "
            }
            return res.status(404).json(message)
            
        }
        var message = "Продукт с id <<"+product_id+">> к заказу не найден"
        return res.status(404).json(message)
    }
    async delete(req,res){
        console.log(req.params)
        const product_id = req.params.id
        const product = await Product.findByPk(product_id)
        if (product){
            await product.destroy(product_id)
            const message = "Продукт с id <<"+product_id+">> к заказу успешно удалён"
            return res.status(200).json(message)
        }
        const message = "Продукт с id <<"+product_id+">> к заказу не найден"
        return res.status(404).json(message)
    }
}

export default new ProductController()