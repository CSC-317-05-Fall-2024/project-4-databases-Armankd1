import express from 'express';
import { getRestaurant, getRestaurants, createRestaurant, deleteRestaurant } from '../data/restaurants.js';

const router = express.Router();

// Add routes here

router.post('/restaurants', (req, res) => {
    console.log('Request Body:', req.body);
    const newRestaurant = req.body;
    const createdRestaurant = createRestaurant(newRestaurant);
    res.status(201).json(createdRestaurant);
});

router.delete('/restaurants/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedData = deleteRestaurant(id);
    res.status(200).json(updatedData);
});

export {router as backendRouter};