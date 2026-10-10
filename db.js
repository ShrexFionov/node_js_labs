import { Sequelize } from "sequelize"; 
import dotenv from "dotenv"

dotenv.config()

const seq = new Sequelize(
    String(process.env.DB_NAME), String(process.env.DB_USER), String(process.env.DB_PASSWORD),
    {
        host: String(process.env.DB_HOST),
        port: Number(process.env.DB_PORT),
        dialect: 'mysql',
        logging: console.log
    }
)
export {seq}