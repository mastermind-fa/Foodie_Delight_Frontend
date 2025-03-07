const apiUrl = "https://foodie-delight-backend-eta.vercel.app/api/cart/";
const token = localStorage.getItem("token"); // Retrieve token from localStorage

// Fetch cart items from the API
async function fetchCartItems() {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart items");
    }

    const cartItems = await response.json();
    renderCartItems(cartItems);
    calculateTotalAmount(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
}

// Render cart items in the table
function renderCartItems(cartItems) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = ""; // Clear existing items

  cartItems.forEach((item) => {
    const row = document.createElement("tr");
    row.className = "border-b hover:bg-gray-100";
    row.innerHTML = `
            <td class="p-3">
                <img src="https://foodie-delight-backend-eta.vercel.app${item.food_item.image}" alt="${
      item.food_item.name
    }" class="w-16 rounded">
            </td>
            <td class="p-3">${item.food_item.name}</td>
            <td class="p-3">$${item.food_item.price}</td>
            <td class="p-3 flex items-center gap-2">
                <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onclick="updateQuantity(${
                  item.id
                }, ${item.quantity - 1})">-</button>
                <span class="px-3">${item.quantity}</span>
                <button class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600" onclick="updateQuantity(${
                  item.id
                }, ${item.quantity + 1})">+</button>
            </td>
            <td class="p-3">$${(
              parseFloat(item.food_item.price) * item.quantity
            ).toFixed(2)}</td>
            <td class="p-3">
                <button class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700" onclick="removeItem(${
                  item.id
                })">Remove</button>
            </td>
        `;
    tbody.appendChild(row);
  });
}

// Update item quantity
async function updateQuantity(itemId, newQuantity) {
  try {
    const response = await fetch(`${apiUrl}${itemId}/`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    if (!response.ok) {
      throw new Error("Failed to update quantity");
    }

    fetchCartItems(); // Refresh the cart items
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
}

// Remove item from the cart
async function removeItem(itemId) {
  try {
    const response = await fetch(`${apiUrl}${itemId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to remove item");
    }

    fetchCartItems(); // Refresh the cart items
  } catch (error) {
    console.error("Error removing item:", error);
  }
}

// Calculate and display the total amount
function calculateTotalAmount(cartItems) {
  const totalAmount = cartItems.reduce((total, item) => {
    return total + parseFloat(item.food_item.price) * item.quantity;
  }, 0);
  document.querySelector(
    ".text-xl.font-bold.text-green-600"
  ).textContent = `$${totalAmount.toFixed(2)}`;
}

// Handle checkout
async function handleCheckout() {
  window.location.href = "checkout.html";
}


// Attach event listener to the "Proceed to Checkout" button
document
  .querySelector(".bg-blue-500")
  .addEventListener("click", handleCheckout);

// Initialize the cart when the page loads
document.addEventListener("DOMContentLoaded", fetchCartItems);
