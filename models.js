import { DataTypes, Sequelize } from 'sequelize'
import {seq} from './db.js'

const User = seq.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false
    },
    activationLink: {
        type: DataTypes.STRING,
    },
    activated:{
        type: DataTypes.BOOLEAN,
    },
    resetToken:{
        type: DataTypes.STRING,
    },
})

const Review = seq.define('review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
}) 

const Order = seq.define('order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
}) 

const OrderItems = seq.define('order_items', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    price_at_a_time: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
})

const Product = seq.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
})

const Category = seq.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
}) 

User.hasMany(Review, {onDelete: "SET NULL",onUpdate:"CASCADE"} )
User.hasMany(Order, {onDelete: "SET NULL",onUpdate:"CASCADE"} )

Order.hasMany(OrderItems, {onDelete: "CASCADE", onUpdate: "CASCADE",foreignKey:{allowNull:false}})

Category.hasMany(Product, {onDelete: "SET NULL", onUpdate: "CASCADE"})

Product.hasMany(Review, {onDelete: "SET NULL", onUpdate: "CASCADE"})
Product.hasMany(OrderItems, {onDelete: "SET NULL", onUpdate: "CASCADE"})

export {User, Review, Order, OrderItems, Product, Category}