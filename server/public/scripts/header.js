/* This file should contain any DOM manipulation
needed to populate the header, nav, and footer elements
*/
//DOM manipulation for the header, nav bar and footer, now I do not need to add them manually
const headerElement = document.getElementById('header');
const navElement = document.getElementById('nav');
const footerElement = document.getElementById('footer');

function populateHeader(){
    headerElement.innerHTML =` 
    <h1> Yerevan </h1>
    `;
}

function populateNav(){
    navElement.innerHTML = `
        <a href="index.html">Home</a>
        <a href="attractions.html">Attractions</a>
        <a href="restaurants">Restaurants</a>
        <a href="newRestaurantForm">New Restaurant</a>
    `;
}

function populateFooter(){
    footerElement.innerHTML = `
            <span id="contact">Contact info: adaghbashyan@sfsu.edu</span>
    `;
}

populateHeader();
populateNav();
populateFooter();