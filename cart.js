const CART_API_URL = "https://foodie-delight-backend-eta.vercel.app/api/cart/";

// Function to fetch and display cart items
async function fetchCart() {
    const response = await fetch('https://foodie-delight-backend-eta.vercel.app/api/cart/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`, // Replace with token handling if needed
        },
    });

    if (response.ok) {
        const products = await response.json();
        displayCart(products);
        // calculateTotalPrice(products);
    } else {
        alert('Failed to fetch cart products.');
    }
}

// Function to display cart items
function displayCart(cartItems) {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    let totalCost = 0;

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `<p class="text-gray-500 text-center">Your cart is empty.</p>`;
        document.getElementById("total-cost").textContent = "0.00";
        return;
    }

    cartItems.forEach(item => {
        totalCost += parseFloat(item.food_item.price) * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("flex", "items-center", "justify-between", "border-b", "pb-4");

        cartItem.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="https://foodie-delight-backend-eta.vercel.app${item.food_item.image}" alt="${item.food_item.name}" class="w-16 h-16 rounded-lg">
                <div>
                    <h3 class="text-lg font-semibold">${item.food_item.name}</h3>
                    <p class="text-gray-600">${item.food_item.price} BDT x ${item.quantity}</p>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                Remove
            </button>
        `;

        cartContainer.appendChild(cartItem);
    });

    document.getElementById("total-cost").textContent = totalCost.toFixed(2);
}

// Function to remove item from cart
async function removeFromCart(cartItemId) {
    try {
        const response = await fetch(`${CART_API_URL}${cartItemId}/`, {
            method: "DELETE",
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
              },
        });
        

        if (response.ok) {
            fetchCart();  // Refresh cart after removal
        } else {
            console.error("Failed to remove item from cart");
        }
    } catch (error) {
        console.error("Error removing item:", error);
    }
}

// Function to handle checkout
async function handleCheckout() {
    const response = await fetch('https://foodie-delight-backend-eta.vercel.app/api/checkout/', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        alert('Order placed successfully!');
        window.location.href = 'orders.html';  // Redirect to orders page
    } else {
        const data = await response.json();
        alert(`Failed to place order: ${data.error || 'Unknown error'}`);
    }
}


// Event Listener for Checkout Button
document.getElementById("checkout-btn").addEventListener("click", handleCheckout);

// Fetch cart items on page load
fetchCart();
