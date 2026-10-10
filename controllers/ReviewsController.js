import {Review, User, Product} from '../models.js'

class ReviewController{
    async create(req,res){
        console.log(req.body)
        const find_user = await User.findByPk(req.body.userId)
        const find_product = await Product.findByPk(req.body.productId)
        if (find_user !== null && find_product !== null){
            const review = await Review.create(req.body) 
            return res.status(201).json(review)
        }
        var message = ""
        if(find_user === null){
            message += "Указаный пользователь не найден "
        }
        if(find_product === null){
            message += "Указаный продукт не найден "
        }
        return res.status(404).json(message)
        
    }
    async get_all(req,res){
        console.log(req.params)
        const review = await Review.findAll()
        if (review.length>0){
            return res.status(200).json(review)
        }
        const message = "Отзывы не найдены"
        return res.status(404).json(message)
    }
    async get(req,res){
        console.log(req.params)
        const review_id = req.params.id
        const review = await Review.findByPk(review_id)
        if (review){
            return res.status(200).json(review)
        }
        const message = "Отзыв с id <<"+review_id+">> не найден"
        return res.status(404).json(message)
    }
    async update(req,res){
        console.log(req.params)
        const review_id = req.params.id
        const review = await Review.findByPk(review_id)
        if (review){
            const find_user = await User.findByPk(req.body.userId)
            const find_product = await Product.findByPk(req.body.productId)
            if (find_user !== null && find_product !== null){
                await review.update(req.body)
                return res.status(200).json(review)
            }
            var message = ""
            if(find_user === null){
                message += "Указаный пользователь не найден "
            }
            if(find_product === null){
                message += "Указаный продукт не найден "
            }
            return res.status(404).json(message)
        }
        var message = "Отзыв с id <<"+review_id+">> не найден"
        return res.status(404).json(message)
    }
    async delete(req,res){
        console.log(req.params)
        const review_id = req.params.id
        const review = await Review.findByPk(review_id)
        if (review){
            await review.destroy(review_id)
            const message = "Отзыв с id <<"+review_id+">> успешно удалён"
            return res.status(200).json(message)
        }
        const message = "Отзыв с id <<"+review_id+">> не найден"
        return res.status(404).json(message)
    }
}

export default new ReviewController()