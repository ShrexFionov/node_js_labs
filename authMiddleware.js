import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const authMiddleware = (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
            return res.status(401).json({message:'Пользователь не авторизован'})
        }

        const decode_token = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode_token
        next()
    } catch (e) {
        return res.status(401).json({message:'Пользователь не авторизован'})
    }
    
}