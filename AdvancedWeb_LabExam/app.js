//declaration
var express 		= require('express');
var bodyParser 		= require('body-parser');
var path 			= require('path');
var ejs 			= require('ejs');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');
var login 			= require('./controllers/login');
var reg 			= require('./controllers/reg');
var logout 			= require('./controllers/logout');
var home 			= require('./controllers/home');
var product 		= require('./controllers/product');

var app = express();

//configuration
app.set('view engine', 'ejs');

//middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my top secret value', saveUninitialized: true, resave: false}));
app.use(cookieParser());
app.use('/login', login);
app.use('/reg', reg);
app.use('/product', product);
app.use('/logout', logout);
app.use('/home', home);


//routes
app.get('/', function(req, res){
	res.render('index');
});

//server startup
app.listen(3000, function(){
	console.log('server started at 3000!');
});
