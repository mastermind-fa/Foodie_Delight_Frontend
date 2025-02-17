document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');

    const apiBaseUrl = 'https://foodie-delight-backend-eta.vercel.app/api';
    const urlParams = new URLSearchParams(window.location.search);
    const foodId = urlParams.get('id'); // Get the food ID from the URL

    if (!foodId) {
        console.error('Food ID not provided in URL');
        alert('Invalid food item. Please try again.');
        return;
    }

    console.log('Fetching food details for ID:', foodId);

    // Fetch food item details
    async function fetchFoodItemDetails(foodId) {
        try {
            const response = await fetch(`${apiBaseUrl}/food-items/${foodId}/`);
            if (!response.ok) {
                throw new Error('Failed to fetch food item details');
            }
            const data = await response.json();
            console.log('Fetched food details:', data);
            return data;
        } catch (error) {
            console.error('Error fetching food item details:', error);
            alert('Failed to load food details. Please try again.');
            return null;
        }
    }

    // Fetch reviews for the food item
    async function fetchFoodItemReviews(foodId) {
        try {
            const response = await fetch(`${apiBaseUrl}/food-items/${foodId}/reviews/`);
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            console.log('Fetched reviews:', data);
            return data;
        } catch (error) {
            console.error('Error fetching food item reviews:', error);
            alert('Failed to load reviews. Please try again.');
            return null;
        }
    }

    // Render food item details
    function renderFoodItemDetails(food) {
        console.log('Rendering food details:', food);

        const foodImage = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.gap-8.bg-white.p-6.rounded-lg.shadow-lg.animate-fadeIn img');
        const foodName = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.gap-8.bg-white.p-6.rounded-lg.shadow-lg.animate-fadeIn h2');
        const foodCategory = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.gap-8.bg-white.p-6.rounded-lg.shadow-lg.animate-fadeIn .text-green-500.font-medium span');
        const foodPrice = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.gap-8.bg-white.p-6.rounded-lg.shadow-lg.animate-fadeIn .text-lg.font-bold.text-gray-800.mt-2');
        const foodDescription = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.gap-8.bg-white.p-6.rounded-lg.shadow-lg.animate-fadeIn .text-gray-600.mt-3');

        // Set image
        if (food.image) {
            foodImage.src = `https://foodie-delight-backend-eta.vercel.app${food.image}`;
            foodImage.alt = food.name;
        }

        // Set name
        foodName.textContent = food.name;

        // Set category
        if (food.category) {
            foodCategory.textContent = food.category.name;
        }

        // Set price
        if (food.pre_discount_price) {
            foodPrice.innerHTML = `
                Price: <span class="line-through text-red-500">$${food.pre_discount_price}</span>
                <span class="text-green-600">$${food.price}</span>
            `;
        } else {
            foodPrice.innerHTML = `Price: <span class="text-green-600">$${food.price}</span>`;
        }

        // Set description
        foodDescription.textContent = food.description || 'No description available.';
    }

    // Render reviews
    function renderReviews(reviews) {
        console.log('Rendering reviews:', reviews);

        const reviewsContainer = document.querySelector('.mt-6.space-y-4');
        reviewsContainer.innerHTML = ''; // Clear existing reviews

        if (reviews.length === 0) {
            // Display a message if no reviews exist
            const noReviewsMessage = document.createElement('div');
            noReviewsMessage.className = 'text-center text-gray-600 italic';
            noReviewsMessage.textContent = 'No reviews yet. Be the first to review!';
            reviewsContainer.appendChild(noReviewsMessage);
        } else {
            // Render reviews if they exist
            reviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = 'bg-white p-4 rounded-lg shadow-md transform transition duration-300 hover:-translate-y-1';

                // Generate star rating
                const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

                reviewCard.innerHTML = `
                    <h4 class="font-bold text-gray-800">${review.customer}</h4>
                    <div class="flex text-yellow-500">${stars}</div>
                    <p class="text-gray-600">${review.comment}</p>
                    <p class="text-sm text-gray-500 mt-2">${new Date(review.created_at).toLocaleDateString()}</p>
                `;
                reviewsContainer.appendChild(reviewCard);
            });
        }
    }

    // Submit review
    async function submitReview() {
        event.preventDefault();

        const rating = document.getElementById("rating").value;
        const comment = document.querySelector("textarea").value;

        // Validate inputs
        if (rating < 1 || rating > 5) {
            alert("Please provide a rating between 1 and 5.");
            return;
        }

        if (!comment.trim()) {
            alert("Please write a review comment.");
            return;
        }

        const sendData = {
            rating: parseInt(rating),
            comment: comment.trim(),
        };

        console.log('Submitting review:', sendData);

        // Get the token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to submit a review.');
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/food-items/${foodId}/reviews/`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sendData),
            });

            // Log the response for debugging
            console.log('Response status:', response.status);
            const responseData = await response.json();
            console.log('Response data:', responseData);

            if (response.ok) {
                alert("Review submitted successfully!");
                // Refresh reviews after submission
                const reviews = await fetchFoodItemReviews(foodId);
                if (reviews) {
                    renderReviews(reviews);
                }
            } else {
                // Handle backend validation errors
                if (response.status === 400) {
                    alert(`Error: ${responseData.error || 'Invalid data. Please check your inputs.'}`);
                } else {
                    throw new Error("Failed to submit review");
                }
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review. Please try again.");
        }
    }

    // Add to cart
    async function addToCart() {
        const quantity = document.getElementById("quantity").value;

        // Validate quantity
        if (quantity < 1) {
            alert("Please enter a valid quantity.");
            return;
        }

        const sendData = {
            food_item_id: foodId,
            quantity: parseInt(quantity),
        };

        console.log('Adding to cart:', sendData);

        // Get the token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to add items to your cart.');
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/cart/`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sendData),
            });

            // Log the response for debugging
            console.log('Response status:', response.status);
            const responseData = await response.json();
            console.log('Response data:', responseData);

            if (response.ok) {
                alert("Food item added to cart!");
            } else {
                // Handle backend validation errors
                if (response.status === 400) {
                    alert(`Error: ${responseData.error || 'Invalid data. Please check your inputs.'}`);
                } else {
                    throw new Error("Failed to add food to cart");
                }
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add food to cart. Please try again.");
        }
    }

    // Attach event listeners
    const submitReviewButton = document.querySelector('button.bg-blue-500');
    if (submitReviewButton) {
        submitReviewButton.addEventListener('click', submitReview);
    }

    const addToCartButton = document.querySelector('button.bg-green-500');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', addToCart);
    }

    // Initialize the page
    async function initialize() {
        const food = await fetchFoodItemDetails(foodId);
        if (food) {
            renderFoodItemDetails(food);

            // Fetch and render reviews
            const reviews = await fetchFoodItemReviews(foodId);
            if (reviews) {
                renderReviews(reviews);
            }
        }
    }

    initialize();
});