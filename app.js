/* Require external APIs and start our application instance */
var express = require('express');
var app = express();
var session = require('express-session');
var bcrypt = require('bcrypt');
var mysql = require('mysql');

/* Configure our server to read public folder and ejs files */
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: "top secret!",
    resave: true,
    saveUninitialized: true
}));

app.use(express.urlencoded({extended: true}));

/* Configure MySQL DBMS */
const connection = mysql.createConnection({
    host: 'un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'epav1bmd0zc7qdom',
    password: 'tcsijlyt2xaexxx8',
    database: 'lnba1anehkvjq4cv'
});
connection.connect();

/* The handler for the DEFAULT route */
app.get('/', function(req, res){
    
    var cats = "select distinct(l9_quotes.category) from l9_quotes;";
	var arr = [];
	
	connection.query(cats,function(error,found){
    	if(error) throw error;
		    if(found.length){
			    found.forEach(function(f){
				    arr.push(f.category);
			    })
            res.render('home', {categories: arr});
	    }
    });
});

app.get('/login', function(req, res){
   res.render('login'); 
});

app.post("/login", async function(req, res){
    let username = req.body.username;
    let password = req.body.password;
    let hashedPwd = "$2a$10$06ofFgXJ9wysAOzQh0D0..RcDp1w/urY3qhO6VuUJL2c6tzAJPfj6";
    
    let passwordMatch = await checkPassword(password, hashedPwd);
    if (username == 'admin' && password == 'password') {
        req.session.authenticated = true;
        res.render('/home');
    } else {
        res.render("login", {"loginError":true});
    }
});

app.get("/adminPage", isAuthenticated, function(req, res){
    res.render("adminPage");
});

app.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/");
});

function isAuthenticated(req, res, next) {
    if (!req.session.authenticated) {
        res.render("login");
    } else {
        next();
    }
}

function checkPassword(password, hashedValue) {
    return new Promise( function(resolve, reject) {
        bcrypt.compare(password, hashedValue, function(err, result) {
            resolve(result);
        });
    });
}


/* The handler for the /author route */
app.get('/author', function(req, res){
    var stmt = 'select * from l9_author where firstName=\'' 
                + req.query.firstname + '\' and lastName=\'' 
                + req.query.lastname + '\';'
	connection.query(stmt, function(error, found){
	    var author = null;
	    if(error) throw error;
	    if(found.length){
	        author = found[0];
	        // Convert the Date type into the String type
	        author.dob = author.dob.toString().split(' ').slice(0,4).join(' ');
	        author.dod = author.dod.toString().split(' ').slice(0,4).join(' ');
	    }
	    res.render('author', {author: author});
	});
});

/* The handler for the /author/name/id route */
app.get('/author/:aid', function(req, res){
    var stmt = 'select quote, firstName, lastName ' +
               'from l9_quotes, l9_author ' +
               'where l9_quotes.authorId=l9_author.authorId ' + 
               'and l9_quotes.authorId=' + req.params.aid + ';'
    connection.query(stmt, function(error, results){
        if(error) throw error;
        var name = results[0].firstName + ' ' + results[0].lastName;
        res.render('quotes', {name: name, quotes: results});      
    });
});

/* The handler for the /gender route */
app.get('/gender', function(req, res){
	var stmt = 'select * ' +
               'from l9_quotes natural join l9_author ' +
               'where sex=\'' + req.query.gender + '\';';
    connection.query(stmt, function(error, results){
        if(error) throw error;
        var name = results[0].firstName + ' ' + results[0].lastName;
        res.render('quotes', {name: name, quotes: results});      
    });
});


/* The handler for the /keyword route */
app.get('/keyword', function(req, res){
    var stmt = 'select quote, firstName, lastName ' +
               'from l9_quotes, l9_author ' +
               'where l9_quotes.authorId=l9_author.authorId ' + 
               'and quote like\'%' + req.query.keyword + '%\';';
    connection.query(stmt, function(error, results){
        if(error) throw error;
        var name = results[0].firstName + ' ' + results[0].lastName;
        res.render('quotes', {name: name, quotes: results});      
    });
});


/* The handler for the /category route */
app.get('/category', function(req, res){
    var stmt = 'select quote, firstName, lastName ' +
               'from l9_quotes, l9_author ' +
               'where l9_quotes.authorId=l9_author.authorId ' + 
               'and category=\'' + req.query.category + '\';';
    connection.query(stmt, function(error, results){
        if(error) throw error;
        var name = results[0].firstName + ' ' + results[0].lastName;
        res.render('quotes', {name: name, quotes: results});      
    });
});




/* The handler for undefined routes */
app.get('*', function(req, res){
   res.render('error'); 
});

/* Start the application server */
app.listen(process.env.PORT || 3306, function(){
    console.log('Server has been started');
});