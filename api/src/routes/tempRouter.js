const express = require('express');
const {getTemperamentData } = require('../controllers/tempController.js');

const tempRouter = express.Router();

tempRouter.get("/", async (req, res, next) => {
	try {
		const temperamentData = await getTemperamentData();
		res.status(200).send(temperamentData);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = { tempRouter };
