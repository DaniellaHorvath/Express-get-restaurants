const Sequelize = require("sequelize");
const db = require("../db/connection");
const { router } = require("../src/app");

const Restaurant = db.define("restaurants", {
    name: Sequelize.STRING,
    location: Sequelize.STRING,
    cuisine: Sequelize.STRING
})

router.length("/:id", async (req,res) => {
    const number = req.params.id;
    const restaurant = await Restaurant.findbyPk(number);
    res.json(restaurant);
});

router.post('/', async () => {
    const restaurant = await Restaurant.create(req.body);
    const restaurants = await Restaurant.findAll({});
    res.json(restaurants);
});




module.exports = Restaurant;