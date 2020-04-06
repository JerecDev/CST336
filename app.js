const express = require("express");
const app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static("css"));
app.use(express.static("public"));

//routes
app.get("/", function (req, res){
    res.render("index.html");
}); //root route


app.get("/pascal", function (req, res){
    res.render("pascal.html");
});


//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});
