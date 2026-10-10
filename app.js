import express from "express"
import { seq } from "./db.js"
import { router } from "./routers/index.js"

const app = express()

app.use(express.json())

const PORT = 3000

let goods = [
    {
        "id": 1,
        "name": "Protein",
        "description": "bababa",
        "producer": "Bombar",
        "price": 89.99
    },
    {
        "id": 2,
        "name": "Cheese",
        "description": "bebebe",
        "producer": "Keksarion De Depontier Boufan Marione Antounetti the First",
        "price": 9999.99
    }
]

app.use('/api', router)

app.get("/goods", (req,res)=>{
    return res.json(goods)
})

app.get("/goods/:id", (req,res)=>{
    var good = goods.find(function(good){if (good.id == req.params.id) return good})
    
    if (good){
        return res.json(good)
    }
    else{
        return res.status(404).json('Товар по заданному id не найден')
    }
})

app.post("/goods", (req, res) => {
  console.log(req.body)
  
  var new_good = {
        "id": Date.now(),
        ...req.body
    }
  
  goods.push(new_good)

  return res.json(goods)
})

app.put("/goods/:id", (req, res)=>{
    var update_id = req.params.id
    var good_to_upd = goods.find(function(good){return good.id === Number(update_id)})

    console.log(req.body)
    if (good_to_upd && req.body){
        if(req.body.name !== undefined) good_to_upd.name = req.body.name
        if(req.body.description !== undefined) good_to_upd.description = req.body.description
        if(req.body.producer !== undefined) good_to_upd.producer = req.body.producer
        if(req.body.price !== undefined) good_to_upd.price = req.body.price
        return res.json('Товар с id: <<'+update_id+'>> успешно обновлён\n')
    }
    else{
        return res.status(404).json('Товар по заданному id не найден')
    }
})

app.delete("/goods/:id", (req, res)=>{
    var delete_id = req.params.id
    var find_good = goods.find(function(good){return good.id === Number(delete_id)})
    
    if (find_good){
        var filtered_good = goods.filter(function(good){return good.id !== delete_id})
        goods = filtered_good
        return res.json('Товар под id: <<'+ delete_id + '>> успешно удален!')
    }
    else{
        return res.status(404).json('Товар по заданному id не найден')
    }
})



app.get("/404", (req, res)=>{
    res.status(404).json("плак плак(")
})

seq.authenticate()
    .then(()=>console.log('БДшка успешно подключена'))
    .catch((error)=>console.log('Ошибка подключения к БД: ', error))
seq.sync({alter: true,})
    .then((result)=>console.log('БДшка успешно синхронизирована'))

app.listen(PORT, ()=>{
    console.log("Сервер работает ура! Порт: ", PORT)
})