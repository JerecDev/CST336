const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.use(express.static("css"));
app.use(express.static("public"));

//routes
app.get("/", function (req, res){
    res.render("index.ejs");
}); //root route

app.get("/index", function (req, res){
    res.render("index.ejs");
});

app.get("/c", function (req, res){
    res.render("c.ejs");
});

app.get("/pascal", function (req, res){
    res.render("pascal.ejs");
});

app.get("/java", function (req, res){
    res.render("java.ejs");
});

//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});
