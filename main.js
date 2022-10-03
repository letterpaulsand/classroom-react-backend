import express from "express"
import dotenv from "dotenv"
import register from "./lib/register.js"
import edit from "./lib/edit.js"
import look from "./lib/look.js"
import moment from "moment-timezone"
const app = express()
dotenv.config()

app.use(express.urlencoded({ extended: true }));

app.post('/register', async (req, res)=>{
    let normalFormat = moment().tz(process.env.TIME_ZONE).format();
    let formatted = moment().tz(process.env.TIME_ZONE).format('YYYY[年] MM[月] DD[日] dddd');
    res.json(await register(req.body, {
        normalFormat,
        formatted
    }))
})

app.post('/edit', async (req, res)=>{
    let normalFormat = moment().tz(process.env.TIME_ZONE).format();
    let formatted = moment().tz(process.env.TIME_ZONE).format('YYYY[年] MM[月] DD[日] dddd');
    res.json(await edit(req.body, {
        normalFormat,
        formatted
    }))
})

app.post('/look', async (req, res)=>{
    res.json(await look(req.body))
})

app.listen(3030, ()=>{
    console.log('server run');
})