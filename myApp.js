require('dotenv').config()
let express = require('express');
let app = express();

/* 
1.
app.get("/", function(req, res) {
    res.send("Hello Express")
}) */

// root middleware
app.use(function(req, res , next){
    let method = req.method
    let path = req.path 
    let ip = req.ip
    console.log(`${method} ${path} - ${ip}`)
    next()
})

absolutePath = __dirname + '/views/index.html'
app.get("/", function(req, res) {
    res.sendFile(absolutePath)
})

// Normal usage
// app.use(express.static(__dirname + "/public"));

app.use("/public", express.static(__dirname+"/public"))

app.get("/json", function(req, res) {
    let variable = process.env.MESSAGE_STYLE
    let message = "Hello json"

    if (variable === "uppercase") {
        message = message.toUpperCase()
    }
    res.json({"message": message})
})

 module.exports = app;