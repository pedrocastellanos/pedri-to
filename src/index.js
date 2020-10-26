const express = require('express');
const path = require('path');
const exhbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const passport = require('passport');

//Handlebars Config
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

//Initializations
const app = express()
require('./config/passport')
require('./db/db')

//Settings

//--PORT
app.set('port', process.env.PORT || 3000)

//-VIEWS
app.set('views', path.join(__dirname, 'views'))

//-Template Engine
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', '.hbs')

//Middlewares
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'urlshortener',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: 'mongodb+srv://pedrito:<Osaris03121971280>@cluster0.usq6d.mongodb.net/<urlshortenerdb>?retryWrites=true&w=majority',
        mongoOptions:{
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }
    })
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Global Variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()  
})



//Routes
app.use(require('./routes/main'))
app.use(require('./routes/url'))

//Static
app.use(express.static(path.join(__dirname, 'public')))

//Server is listening
app.listen(app.get('port'), ()=>{
    console.log(`Server listening on port ${app.get('port')}`)
})