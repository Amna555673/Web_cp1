// Function to handle login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'admin123') {
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('error-message').textContent = 'Invalid username or password!';
    }
});

// Initialize an empty cart in localStorage if it doesn't exist
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// List of products with their respective image URLs and IDs
const products = {
    brownie1: 'brwny1.jpeg',
    brownie2: 'brownie2.jpg',
    brownie3: 'brwonie-3.jpg'
};

// Add product to cart
function addToCart(productId) {
    // Get the cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart'));

    // Add the selected product to the cart
    cart.push(productId);

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optionally, show a confirmation message
    alert(`${productId} has been added to your cart!`);
}

// Add event listeners to each image so they can be clicked to add to cart
document.querySelectorAll('.product-img').forEach(img => {
    img.addEventListener('click', () => {
        addToCart(img.getAttribute('data-id')); // Get the unique product ID from the clicked image
    });
});

// Add event listener for the "Add to Cart" button if you want it to work as well
document.getElementById('addToCartBtn').addEventListener('click', () => {
    alert('Please select a brownie first by clicking on an image.');
});

// Display cart items
function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Clear cart container before displaying

    // If cart is empty, show a message
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
    } else {
        // Loop through each item in the cart and display it
        cartItems.forEach(itemId => {
            const productImg = products[itemId];
            if (productImg) {
                // Create an img element to display the product image
                const imgElement = document.createElement('img');
                imgElement.src = productImg;
                imgElement.alt = itemId;
                imgElement.classList.add('cart-item-img'); // Optionally add a CSS class

                // Append the image to the cart container
                cartContainer.appendChild(imgElement);
            }
        });
    }
}

// Call displayCart to show items when the page loads
displayCart();
