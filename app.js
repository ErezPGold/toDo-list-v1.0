
const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");


const app = express();

var items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    
    const day = date.getDate();

    res.render("list", {ListTitle: day, NewListItems: items});

});

app.post("/", function(req, res) {
    console.log(req.body);
    item = req.body.newItem;

    if (req.body.list === "Work") {
        console.log("adding to work list, redirecting to work page...");
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }    
});

app.get("/work", function(req, res) {
    res.render("list", {ListTitle: "Work List", NewListItems: workItems});

});

app.post("/work", function(req, res) {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about", function(req, res) {
    res.render("about");
})

app.listen(3000, function() {
    console.log("Server started on port 3000.");
})