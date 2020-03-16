const express = require('express');
const app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));
app.use(express.static("css"));


app.get("/", function(req, res){
  res.render('index.html');
});

app.get("/mercury", function(req, res){
  res.render('mercury.html');
});

app.get("/venus", function(req, res){
  res.render('venus.html');
});

app.get("/earth", function(req, res){
res.render('earth.html');
});

app.get("/uranus", function(req, res){
res.render('uranus.html');
});

app.get("/jupiter", function(req, res){
res.render('jupiter.html');
});

app.get("*", function(req, res){
  res.render('error')
});


//listener
app.listen(process.env.PORT, process.env.IP, function() {
  console.log('Running Express Server...');
});


var server = app.listen(3000, function() {

});
