// Fill this in
// Get a list of restaurants
import { pool } from '../config/database.js';

const getRestaurants = async () => {
    const result = await pool.query('SELECT * FROM restaurants');
    return result.rows;
};


// Get a restaurant by id
const getRestaurant = async (id) => {
    const result = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
    return result.rows[0];
};

// Create a new restaurant entry
const createRestaurant = async (newRestaurant) => {
    const { name, phone, address, photo } = newRestaurant;
    const result = await pool.query(
        'INSERT INTO restaurants (name, phone, address, photo) VALUES ($1, $2, $3, $4) RETURNING id',
        [name, phone, address, photo]
    );
    const id = result.rows[0].id;
    return { id, ...newRestaurant };
};

// Delete a restaurant by id
const deleteRestaurant = async (id) => {
    await pool.query('DELETE FROM restaurants WHERE id = $1', [id]);
    return { message: 'Restaurant deleted successfully' };
};

//reviews
const getReviewsForRestaurant = async (id) => {
    const result = await pool.query('SELECT * FROM reviews WHERE restaurant_id = $1', [id]);
    return result.rows;
};

export { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant, getReviewsForRestaurant };