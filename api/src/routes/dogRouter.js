// const { Router } = require('express');
const express = require('express');
const { Dog, Temperament } = require('../db.js');
const { getAll } = require('../controllers/dogController.js');

const dogRouter = express.Router();
dogRouter.use(express.json());

//get all dogs
dogRouter.get("/", async (req, res) => {
    const { name } = req.query;//trae name de query
    try {
        const allDogs = await getAll();
        
//get dogs from name
        if (name) {//si el query tiene nombre
            const dog = allDogs.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));//filtra sin importar mayusculas o minusculas
    
            dog.length ? res.send(dog) : res.status(404).send("Dog not found");
        } else {
            return res.send(allDogs);//si no tiene query manda todos los perros
        };
    } catch (error) {
        res.status(404).json({ error: error.message });
    };
});

//get dogs from temp


//get dogs from id raza
dogRouter.get("/:idRaza", async (req, res) => {
    try {
        const { idRaza } = req.params;
        const allDogs = await getAll();
        const dog = allDogs.filter((e) => e.id == idRaza);
    
        if (dog.length) return res.json(dog);
        else return res.status(404).send("Dog not found");
    } catch (error) {
        res.status(404).send({error: error.message})
    }
});

//post dogs
dogRouter.post("/dog", async (req, res) => {
    const { //peticion de body gguarda en una variable
        name, 
        min_height, 
        max_height, 
        min_weight, 
        max_weight, 
        min_life,
        max_life,
        temperaments,
        image, 
    } = req.body;
    const mixedHeight = [];
    const mixedWeight = [];
    let mixedLifeSpan = null;
    const minHeight = min_height;
    const maxHeight = max_height;
    const minWeight = min_weight;
    const maxWeight = max_weight;
    
    mixedHeight.push(minHeight, maxHeight);
    mixedWeight.push(minWeight, maxWeight);
    mixedLifeSpan = `${min_life} - ${max_life} years`;
    try {
    
        let dog = await Dog.create({//crea en db
            name,
            height: mixedHeight,
            weight: mixedWeight,
            life_span: mixedLifeSpan,
            image: image || ('../controllers/default.jpg'),
        });
    
        let conbinedTemp = await Temperament.findAll({
            where:  { name: temperaments },
        });
    
        dog.addTemperament(conbinedTemp);
        res.send("Dog succesfully created!");
    } catch (error) {
        res.status(404).send({error: error.message})
    }
    
});


module.exports = { dogRouter };