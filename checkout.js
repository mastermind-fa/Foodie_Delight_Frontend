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
    
    calculateTotalAmount(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
}
function calculateTotalAmount(cartItems) {
    // Calculate the total price of the cart items
    const totalPrice = cartItems.reduce((total, item) => {
        return total + parseFloat(item.food_item.price) * item.quantity;
    }, 0);

    // Calculate the tax (assuming a fixed tax rate of 10% for example)
    const taxRate = 0.1; // 10% tax
    const tax = totalPrice * taxRate;

    // Calculate the total amount including tax
    const totalAmount = totalPrice + tax;

    // Update the DOM elements with the calculated values
    document.getElementById("total-price").innerHTML = `Total Price: <span class="font-semibold">$${totalPrice.toFixed(2)}</span>`;
    document.getElementById("total").innerHTML = `Total: <span class="font-semibold">$${totalAmount.toFixed(2)}</span>`;
}
async function handlePayment() {
    try {
      
        const deliveryAddress = {
            name: document.querySelector('input[placeholder="Name"]').value,
            phone_number: document.querySelector('input[placeholder="Phone Number"]').value,
            email: document.querySelector('input[placeholder="Email"]').value,
            address: document.querySelector('input[placeholder="Address"]').value,
            city: document.querySelector('input[placeholder="City"]').value,
            postal_code: document.querySelector('input[placeholder="Postal Code"]').value,
          };
          if (
            !deliveryAddress.name ||
            !deliveryAddress.phone_number ||
            !deliveryAddress.email ||
            !deliveryAddress.address ||
            !deliveryAddress.city ||
            !deliveryAddress.postal_code
          ) {
            alert("Please fill out all delivery address fields.");
            return;
          }


      const response = await fetch(
        "https://foodie-delight-backend-eta.vercel.app/payment/create_payment/",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        // Redirect to SSLCommerz payment gateway
        window.location.href = data.url;
      } else {
        alert("Failed to initiate checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to place order. Please try again.");
    }
  }
  fetchCartItems();