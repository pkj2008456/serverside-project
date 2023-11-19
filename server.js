const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
// new 
const mongoose = require('mongoose');
const SchoolSchema = require('./model/School');
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://1234:1234@cluster0.ajdwydz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function createListing(newlist) {
  		try {
    		// Connect the client to the server	(optional starting in v4.7)
    			await client.connect();
    		// Send a ping to confirm a successful connection
    			await client.db("admin").command({ ping: 1 });
    			console.log("Pinged your deployment. You successfully connected to MongoDB!");
    			const result = await client.db("Clustor0").collection("School").insertOne(newlist);
    			console.log(`New listing created with the following id: ${result.insertedId}`);
  			} finally {
    		// Ensures that the client will close when you finish/error
    			await client.close();
  			}
		}

//
const app = express();

app.set('view engine','ejs');
app.set('views', 'views');
app.use(express.static(__dirname+'/public'));
const SECRETKEY = 'I want to pass COMPS381F';

const users = new Array(
	{name: 'developer', password: 'developer'},
	{name: 'guest', password: 'guest'}
);

app.use(session({
  name: 'loginSession',
  keys: [SECRETKEY]
}));

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
	console.log(req.session);
	if (!req.session.authenticated) {    // user not logged in!
		res.redirect('/login');
	} else {
		res.redirect('/index');
	}
});

app.get('/login', (req,res) => {
	res.status(200).render('login',{});
});

app.get('/index', (req,res) => {
	res.status(200).render('index',{});
});

app.get('/home', (req,res) => {
	res.status(200).render('homepage',{});
});

app.get('/create', (req,res) => {
	res.status(200).render('create',{});
});

app.get('/delete', (req,res) => {
	res.status(200).render('delete',{});
});

app.get('/update', (req,res) => {
	res.status(200).render('update',{});
});

app.get('/read', (req,res) => {
	res.status(200).render('Read',{});
});

app.get('/create', (req,res) => {});

app.post('/login', (req,res) => {
	users.forEach((user) => {
		if (user.name == req.body.name && user.password == req.body.password) {
			// correct user name + password
			// store the following name/value pairs in cookie session
			req.session.authenticated = true;        // 'authenticated': true
			req.session.username = req.body.name;	 // 'username': req.body.name		
		}
	});
	res.redirect('/');
});

app.get('/logout', (req,res) => {
	req.session = null;   // clear cookie-session
	res.redirect('/');
});

app.listen(process.env.PORT || 8099);
