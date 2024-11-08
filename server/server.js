import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import {getRestaurants, getRestaurant, createRestaurant, deleteRestaurant} from './data/restaurants.js';
import { backendRouter } from './routes/api.js'; // Adjusted import statement

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));//static index page migration
});

//setting view engine, ejs
app.set('views', './views');
app.set('view engine', 'ejs');

//setting restaurant page, dynamic
app.get('/restaurants', async (req, res) => {
    res.render('restaurants', { restaurantData:await getRestaurants()})
})

// Setting restaurant details page, dynamic
app.get('/restaurants/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const restaurant = getRestaurant(id);
    if (restaurant) {
        res.render('restaurant-details', { restaurant });
    } else {
        res.status(404).send('Restaurant not found');
    }
});


//setting new restaurant form page, dynamically
app.get('/newRestaurantForm', (req, res) => {
    res.render('newRestaurantForm')
})

app.use('/api', backendRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
