require('dotenv').config()
const bodyParser = require('body-parser');
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
// using body parser
app.use(
    bodyParser.urlencoded({extended: false})
)

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

// Chain Middleware to Create a Time Server

// solution 1

/* app.get("/now", (req, res, next) => {
    req.time = new Date().toString()
    next()
},
(req, res) => {
    res.send({
        time: req.time
    })
}
) */

// solution 2
// declare the middleware beforehand to use in multiple routes

const middleware = (req, res, next) => {
    req.time = new Date().toString();
    next();
}

app.get("/now", middleware, (req, res) => {
    res.send({
        time: req.time
    })
})

// Get Route Parameter Input from the Client
app.get("/:word/echo", (req, res) => {
    let {word} = req.params

    res.send({
        echo: word
    })
})

// Get Query Parameter Input from the Client
app.get('/name', (req, res) => {
    let {first, last} = req.query

    res.send({
        name: `${first} ${last}`
    })
})

// Use body-parser to Parse POST Requests


// app.route(path).get(handler).post(handler)

module.exports = app;