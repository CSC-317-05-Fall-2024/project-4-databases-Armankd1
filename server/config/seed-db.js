/* Initialize the data in the DB */
import { pool } from './database.js';
let restaurantData = [
    {
        name: "Seasons Restaurant",
        address: "15, 5 Mesrop Mashtots, Yerervan 0002 Armenia", 
        phone: "+374 43 709070", 
        photo: "/images/seasons.jpg"
    },
    {
        name: "Tavern Yerevan", 
        address: "91 Teryan St., Yerevan 0009 Armenia",
        phone: "+374 96 508800", 
        photo: "/images/tavernYerevan.jpg"
    },
    {
        name: "In Vino",
        address: "6 Saryan street, Yerevan 0002 Armenia",
        phone: "+374 10 521931",
        photo: "/images/invino.jpg"
    },
    {
        name: "Sherep Restaurant",
        address: "Amiryan str. 1, Yerevan 0010 Armenia",
        phone: "+374 43 600880",
        photo: "/images/sherep-restaurant.jpg"
    },
    {
        name: "Syrovarnya",
        address: "Northern Avenue 5, Yerevan 0001 Armenia",
        phone: "+374 11 381111",
        photo: "/images/syrovarnya.jpg"
    },
    {
        name: "Cosa Nostra",
        address: "91 Pavstos Buzand str., Yerevan 0002 Armenia",
        phone: "+374 10 754466",
        photo: "/images/cosanostra.jpg"
    }
];

const dropTables = async () => {
    try {
        await pool.query('DROP TABLE IF EXISTS reviews');
        await pool.query('DROP TABLE IF EXISTS restaurants');
    } catch (error) {
        console.log(error)
    }
}

const createTables = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS restaurants (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            address VARCHAR(255),
            photo VARCHAR(255)
        )
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            rating INTEGER NOT NULL,
            content TEXT,
            restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE
        )
    `);
    console.log('Created tables');
  };

const insertData = async () => {
    try {
        await pool.query(`
            INSERT INTO restaurants (name, phone, address, photo)
            VALUES
            ${restaurantData.map(r => `('${r.name}', '${r.phone}', '${r.address}', '${r.photo}')`).join(', ')}
        
        `);
        await pool.query(`
            INSERT INTO reviews (rating, content, restaurant_id) VALUES
            (5, 'Great food!', 1),
            (4, 'Good service.', 1),
            (3, 'Average experience.', 2),
            (2, 'Not so good.', 2)
        `);
  console.log('Inserted data');
    } catch (error) {
        console.log(error)
    }
}

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
}

setup();
