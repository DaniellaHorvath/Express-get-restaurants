const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 

app.get("/restaurant", async (res, req) => {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
})


module.exports = app;