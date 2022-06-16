// const { json } = require('body-parser');
const express = require('express')
const fs = require('fs')

const app = express();
app.use(express.json())

const players = require('./players.json')
app.get('/api/viewplayers',(req,res)=>{
    const nammme = req.query.name
    const result =players.find(each => each.name == nammme)
    if(result){
        res.send(players.find(each => each.name == nammme))
    }
    else{
        res.send('player not found')
    }
})

app.post('/api/addplayer',(req,res)=>{
    players.push(req.body)
    fs.writeFileSync('players.json',JSON.stringify(players))
    res.send('player added')
})

app.post('/api/removeplayer',(req,res)=>{
    const updatedPlayerList = players.filter(player => player.name !== req.body.name)
    fs.writeFileSync('players.json',JSON.stringify(updatedPlayerList))
    res.send('player removed')
})

app.listen(3000,()=>{
    console.log('server is on port 3000')
})