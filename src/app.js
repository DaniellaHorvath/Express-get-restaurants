const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");
const { where } = require("sequelize");

//TODO: Create your GET Request Route Below: 

app.get("/restaurants", async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
})

// CREATE - GET (Part1)
app.get("/restaurants/:id", async (req, res) => {
    const restaurants = await Restaurant.findByPk(req.params.id);
    
    if(restaurants) {
        res.json(restaurants)
    }else{
        res.status(404).json({ error: "Post not found!"})
    }
});

// (Part2)
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // we can parse the request body with urlencoded values

app.post("/restaurants", async (req, res) => {
    const newRestaurant = await Restaurant.create(req.body);
    
    if(!req.body){
        res.status(400).json({ error: "Missing post!"})
        return;
    }
    res.status(201).json(newRestaurant);
});

// UPDATE: PUT/PATCH
app.patch("/restaurants/:id", async (req, res) => {
    let updateRest = await Restaurant.findByPk(req.params.id);

    if (!updateRest) {
        res.status(404).json({ error: "Post not found!"})
        return
    }

    updateRest = await Restaurant.update(req.body);
    res.status(200).json(updateRest);


} )

// DELETE
app.delete("/restaurants/:id", async (req, res) => {
    const restaurants = await Restaurant.findByPk((req.params.id));

    if(!restaurants){
        res.status(404).json({ error: "Restaurant not found!"});
        return;
    }
    await restaurants.destroy();
    res.status(204).send();
})




module.exports = app;