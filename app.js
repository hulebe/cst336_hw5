const express = require("express");
const app     = express();
const fetch   = require("node-fetch");

app.set("view engine", "ejs");
app.use(express.static("public"));

//routes
app.get("/", async function(req, res, next){
    let apiUrl = `https://official-joke-api.appspot.com/random_joke`;
    let response = await fetch(apiUrl);
    let data = await response.json();
	res.render("index", {"randomJoke": data.setup, "jokeAnswer": data.punchline});
	next();
});

app.get("/search", async function(req, res){
    let keyword = "";
    if (req.query.keyword) {
        keyword = req.query.keyword;
    }
    
    let apiUrl = `https://official-joke-api.appspot.com/jokes/${keyword}/ten`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    
    res.render("results", {"joke": data[0].setup, "jokeAnswer":data[0].punchline});
});

//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});
