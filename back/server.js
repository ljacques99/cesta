const express = require('express')
const cors = require("cors")
const app= express()
const db = require("./db")
app.use(cors())

app.get("/ping", (req, res) => {
    res.send({fecha: new Date()})
})

app.get("/productos", async (req,res) => {
    try{
        const [r, f] = await db.q("select * from Products", [])
        res.send(r)
    } catch (error) {
        res.send({error})
    }  
})

app.get("/productos/:id", async (req,res) => {
    try{
        const [r, f] = await db.q("select * from Products where ProductID = ?", [req.params.id])
        res.send(r)
    } catch (error) {
        res.send({error})
    }  
})

app.listen(5555)