var express = require('express') 
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var path = require('path')

var User = require('./userModel')
 
var app = express()     
//var router = require('./router')
var path = require('path')

//app.use('/api', router)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/client/dist'))
app.use(cookieParser())
app.use('/login', session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false
})) 


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/client/dist/index.html'))
    
})


app.post('/login', function(req, res){
    
    User.findOne({user_id: req.body.user_id, password: req.body.password}, function(err, user){
        if(err){
            console.log(err)
            res.sendStatus(500)
        }
        if(!user){
            console.log('no user')
            res.sendStatus(404)
        }
        else{
            user.sessionID = req.sessionID
            req.session.save(function(err){

            })
            user.save(function(err){
                if(err)
                    res.sendStatus(500)
            
            res.send(user) 
            })
        }
    })
})


app.post('/login/user/logout', function(req, res){

    User.findOne({user_id: req.body.user_id}, function(err, user){
        user.sessionID = null
        req.session.destroy(function(err){
            console.log('session destroyed')
        })
        user.save(function(err){
            if(err)
                res.sendStatus(500)
        console.log('user logged out')
        res.sendStatus(200) 
        })
    })
})



app.post('/signup', function(req, res){
    
    User.findOne({user_id: req.body.user_id}, function(err, user){
        if(err){
            res.sendStatus(500)
        }
        if(user){
            console.log('Username already taken')
            res.sendStatus(404)
        }
        else{
            var user = new User({name: req.body.name, user_id: req.body.user_id, password: req.body.password})
            user.save(function(err){
                if(err)
                    res.sendStatus(500)
                console.log('new user created')
                res.sendStatus(200)
            })
        }
    })
})


app.post('/:user_id/messages', function(req, res){
    User.findOne({user_id: req.params.user_id}, function(err, user){
        if(err)
            res.sendStatus(500)
        if(!user)
            res.sendStatus(404)
        user.messages.push(req.body.message)
        user.save(function(err){
            if(err)
                res.sendStatus(500)
            console.log('message posted')
            res.sendStatus(200)
        })
        
    })
}) 

app.get('/search/:user_id', function(req, res){
    User.findOne({user_id: req.params.user_id}, function(err, user){
        if(err){
            console.log(err)
            res.sendStatus(500)
        }
        if(!user){
            console.log('user not found')
            res.sendStatus(404)
        }
        else{
            res.sendStatus(200)
        }
    })
    
})


app.listen(3000,function(){
    console.log("app is listening @port 3000")
})

