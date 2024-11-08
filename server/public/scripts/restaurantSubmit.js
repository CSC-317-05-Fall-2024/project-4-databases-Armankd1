document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('new-restaurant-form');
    form.addEventListener('submit', handleSubmit);
});

function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const form = event.target;
    const formData = new FormData(form);

    const newRestaurant = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        photo: formData.get('photo')
    };

    console.log('Form Data:', newRestaurant);
    

        const response = fetch('/api/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRestaurant)
        }).then(response => {

            if (response.ok) {
                window.location.href = 'restaurants';
            } else {
                console.error('Failed to create restaurant');
            }
        });

        

}