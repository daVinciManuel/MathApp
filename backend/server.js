import express from 'express'
import {sequelize} from "./db/con.js"
import User from './models/Users.js'

const app = express()
sequelize.sync()
.then(() => console.log("ALL DATABASE TABLES CREATED"))
.catch((err) => console.log("Error creating DB: " + err))

app.use(express.json())
app.use(express.urlencoded({extended:true}))


// ----------------------------------------------------------------
// ------------ API GESTION USUARIOS -----------------------------
// Get All users
app.get('/users', async (req, res) => {
    try{
        const users = await User.findAll()
        res.json(users)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// Get a SINGLE USER
app.get('/users/:id', async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id)
        if(!user) return res.status(404).json({error: "User not found."})
        res.json(user)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// CREATE a USER
app.post('/users', async (req, res) => {
    try{
        const users = await User.create(req.body)
        res.json(users)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// UPDATE a USER
app.put('/users/:id', async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id)
        if(!user) return res.status(404).json({error: "User not found."})

        await User.update(req.body, {where : { id : req.params.id}})
        res.json(user)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// DELETE a USER
// no funciona en local (Manuel)
app.delete('/users', async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id)
        if(!user) return res.status(404).json({error: "User not found."})

        await user.destroy(req.body)
        res.json(user)

    }catch(err){
        res.status(500).json({error: err.message})
    }
})
// ----------------------------------------------------------------
// ----------------------------------------------------------------

app.listen(5000,() => {
    console.log('Server is running on http://localhost:5000')
})