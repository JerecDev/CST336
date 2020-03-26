const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("css"));
app.use(express.static("public"));
const request = require('request');

//routes
app.get("/", function (req, res){
    res.render("index");
}); //root route


app.get("/results", function(req, res){
    var query = req.query.search; //gets the value that the user typed in the form using the GET method
	var url = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + query + '&format=json&jscmd=data';
	request(url, function(error, response, dataStream){
		if (!error && response.statusCode == 200){
			var data = JSON.parse(dataStream);
			res.render("results", {data:data, query:query});
		}
	});
});//results route



//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
})
