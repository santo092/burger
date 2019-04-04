const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");


router.get("/", function (req, res) {
    res.redirect("/burgers");
});

//READ
router.get("/burgers", (req, res) => {
    burger.selectAll(function (data) {
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});


//CREATE
router.post("/api/burgers", (req, res) => {
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, false], function () {
        res.redirect("/burgers");
    });
});

//UPDATE
router.post("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    burger.updateOne({
      devoured: req.body.devoured
    }, condition, function(data) {
      res.redirect("/burgers");
    });
  });

module.exports = router;
