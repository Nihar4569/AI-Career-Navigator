const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRouter = require('./routers/homeRouter');
const port = process.env.PORT || 8080;

const app = express();
app.set('views','./views')
app.set('view engine','ejs')
app.get('',(req,res)=>{
    res.render('register',{title: 'Fill Form', password: '', email: ''})
})
app.get('/iq',(req,res)=>{
    res.render('iq',{text: 'iq'})
})
app.get('/trivia',(req,res)=>{
    res.render('trivia',{text: 'trivia'})
})
app.get('/chat',(req,res)=>{
    res.render('chat',{text: 'chat'})
})
// Add session middleware with a manually set secret key
app.use(session({
    secret: '416411654161', // Replace with your chosen secret key
    resave: false,
    saveUninitialized: true,
}));

// db con
mongoose.connect('mongodb://127.0.0.1:27017/studentsdata', { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", () => { console.log("error in connection"); });
db.once('open', () => { console.log("Connected"); });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', homeRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
