
const express = require("express");
const http = require("http");

const app = express()

// estático.
app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/public/Curriculum"))
// rota
app.get("/", (req,res)=>{
    res.sendFile(__dirname + "Curriculum/index.html")
})



const server = http.createServer(app);
server.listen(3000, ()=>{
    console.log("running at localhost:3000...")
})