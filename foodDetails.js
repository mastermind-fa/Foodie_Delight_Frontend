// Fetch food details by ID
async function fetchFoodDetails(foodId) {
    try {
      const response = await fetch(`https://foodie-delight-backend-eta.vercel.app/api/food-items/${foodId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch food details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching food details:", error);
      return null;
    }
  }
  
  // Fetch reviews for a food item
  async function fetchReviews(foodId) {
    
    
    try {
      const response = await fetch(`https://foodie-delight-backend-eta.vercel.app/api/food-items/${foodId}/reviews/`);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const reviews = await response.json();
      return reviews;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
  }
  
  // Submit review for a food item
  async function submitReview(event) {
    event.preventDefault();
    
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;
    const urlParams = new URLSearchParams(window.location.search);
    const foodId = urlParams.get("id");
  
    const sendData = {
      rating: parseInt(rating),
      comment: comment,
    };
  
    try {
      const response = await fetch(`https://foodie-delight-backend-eta.vercel.app/api/food-items/${foodId}/reviews/`, {
        method: "POST",
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
  
      if (response.ok) {
        alert("Review submitted successfully!");
        displayFoodDetails(); // Refresh details and reviews
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  }
  
  // Display food details and reviews
  async function displayFoodDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const foodId = urlParams.get("id");
  
    if (foodId) {
      const food = await fetchFoodDetails(foodId);
      if (food) {
        // Set food details
        document.getElementById("food-image").src = `https://foodie-delight-backend-eta.vercel.app${food.image}`;
        document.getElementById("food-name").textContent = food.name;
        document.getElementById("food-description").textContent = food.description;
        
        document.getElementById("food-popularity").textContent = `Category: ${food.category.name}`;
        // Check if pre-discount price exists
        if (food.pre_discount_price) {
          document.getElementById("food-price").innerHTML = `
              <span class="line-through text-gray-400">৳${food.pre_discount_price}</span> 
              <span class="text-red-500 font-bold">৳${food.price}</span>
          `;
      } else {
          document.getElementById("food-price").textContent = `৳${food.price}`;
      }
        
        // Fetch and display reviews
        const reviews = await fetchReviews(foodId);
        displayReviews(reviews);
      } else {
        alert("Food item not found!");
      }
    } else {
      alert("Invalid food ID!");
    }
  }
  
  // Display reviews
  function displayReviews(reviews) {
    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "";
  
    if (reviews.length === 0) {
      reviewList.innerHTML = "<p class='text-gray-600'>No reviews yet.</p>";
      return;
    }
  
    reviews.forEach((review) => {
      const reviewCard = `
        <div class="bg-white shadow-lg rounded-lg p-6 mb-4">
          <div class="flex items-center mb-2">
            <span class="text-yellow-500 text-xl">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span>
            <span class="ml-2 text-gray-600">${review.rating}/5</span>
          </div>
          <p class="text-gray-600">${review.comment}</p>
          <p class="text-gray-400 text-sm mt-2">- ${review.customer}</p>
        </div>
      `;
      reviewList.innerHTML += reviewCard;
    });
  }
  
  // Add to cart
  async function addToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const foodId = urlParams.get("id");
    const quantity = document.getElementById("quantity").value;
  
    const sendData = {
      food_item_id: foodId,
      quantity: quantity,
    };
    console.log(sendData);
    
  
    try {
      const response = await fetch("https://foodie-delight-backend-eta.vercel.app/api/cart/", {
        method: "POST",
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
  
      if (response.ok) {
        alert("Food item added to cart!");
      } else {
        throw new Error("Failed to add food to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }
  
  // Initialize page
  document.addEventListener("DOMContentLoaded", () => {
    displayFoodDetails();
  });
  