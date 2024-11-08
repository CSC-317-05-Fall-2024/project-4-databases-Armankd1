/* This file should contain definitions for deleteRestaurantCard,
    and js to attach it as a handler per card.
*/

async function deleteRestaurantCard(event) {
    event.preventDefault(); // Prevent the default button click behavior
    const buttonClicked = event.target;
    const cardToDelete = buttonClicked.closest('.restaurant-card');
    const restaurantId = cardToDelete.getAttribute('data-id');

    if (cardToDelete) {
        try {
            const response = await fetch(`/api/restaurants/${restaurantId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Re-render the restaurant list
                //await fetchRestaurants();
                await new Promise(r => setTimeout(r, 2000));
                window.location.reload();
            } else {
                console.error('Failed to delete restaurant');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

async function fetchRestaurants() {
    try {
        const response = await fetch('/restaurants');
        const html = await response.text();
        document.querySelector('.restaurants').innerHTML = html;
        // Re-attach event listeners to the new delete buttons
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', deleteRestaurantCard);
        });
    } catch (error) {
        console.error('Error fetching restaurants:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', deleteRestaurantCard);
    });
});
