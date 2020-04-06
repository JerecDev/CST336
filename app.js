const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("css"));
app.use(express.static("public"));

//routes
app.get("/", function (req, res){
    res.render("pascal");
}); //root route


app.get("/pascal", function (req, res){
    res.render("pascal");
});

app.get("/c++", function (req, res){
    res.render("c++");
});

app.get("/java", function (req, res){
    res.render("java");
});

//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});
