document.addEventListener('DOMContentLoaded', function () {
    const categoriesContainer = document.querySelector('.flex.justify-center.gap-4.mt-6');
    const foodItemsContainer = document.querySelector('.container.mx-auto.py-10 .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4.gap-6.mt-8');
    const specialItemsContainer = document.querySelector('.container.mx-auto.py-10.mt-3 .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4.gap-6.mt-8');
    const apiBaseUrl = 'https://you-fashion-backend.vercel.app/api';

    // Fetch categories and food items
    async function fetchCategories() {
        try {
            const response = await fetch(`${apiBaseUrl}/categories/`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    async function fetchFoodItems(url = `${apiBaseUrl}/food-items/`) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching food items:', error);
        }
    }

    async function fetchSpecialFoodItems(url = `${apiBaseUrl}/specials/`) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching special food items:', error);
        }
    }

    // Render categories as buttons
    function renderCategories(categories) {
        // Add "All Categories" button
        const allCategoriesButton = document.createElement('button');
        allCategoriesButton.className = 'bg-green-500 text-white px-5 py-2 rounded-lg transform transition duration-300 hover:-translate-y-1';
        allCategoriesButton.textContent = 'All Categories';
        allCategoriesButton.addEventListener('click', () => {
            fetchAndRenderFoodItems(`${apiBaseUrl}/food-items/`);
        });
        categoriesContainer.appendChild(allCategoriesButton);

        // Add category buttons
        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'bg-green-500 text-white px-5 py-2 rounded-lg transform transition duration-300 hover:-translate-y-1';
            button.textContent = category.name;
            button.addEventListener('click', () => {
                fetchAndRenderFoodItems(`${apiBaseUrl}/categories/${category.slug}/food-items/`);
            });
            categoriesContainer.appendChild(button);
        });
    }

    // Render food items as cards
    function renderFoodItems(foodItems, container, isSpecial = false) {
        container.innerHTML = ''; // Clear existing items
        foodItems.forEach(food => {
            const card = document.createElement('div');
            card.className = 'bg-white p-4 rounded-lg shadow-md transform transition duration-300 hover:-translate-y-2';
            card.innerHTML = `
                <a href="javascript:void(0);" onclick="viewDetails(${food.id})">
                    <img src="https://you-fashion-backend.vercel.app${food.image}" alt="${food.name}" class="w-full rounded-md cursor-pointer">
                </a>
                <h3 class="text-xl font-semibold mt-4">${food.name}</h3>
                <p class="text-green-600 font-medium">4.8/5 Excellent (1214 reviews)</p>
                ${isSpecial ? `
                    <p class="text-red-500 font-semibold mt-4">
                        <span class="line-through text-gray-400">$${food.price}</span> $${food.pre_discount_price}
                    </p>
                ` : `
                    <p class="text-red-500 font-semibold mt-4">
                        ${food.pre_discount_price ? `
                            <span class="line-through text-gray-400">$${food.price}</span>
                            <span class="text-red-500 font-bold">৳${food.pre_discount_price}</span>
                        ` : `
                            $${food.price}
                        `}
                    </p>
                `}
                <div class="flex items-center gap-2 mt-3">
                    <label for="quantity-${food.id}" class="text-gray-700">Qty:</label>
                    <input type="number" id="quantity-${food.id}" name="quantity" min="1" value="1" class="w-16 p-1 border rounded-md">
                </div>
                <button class="bg-green-500 text-white px-4 py-2 mt-3 w-full rounded-lg" onclick="addToCart(${food.id})">Add To Cart</button>
            `;
            container.appendChild(card);
        });
    }

    // Fetch and render food items
    async function fetchAndRenderFoodItems(url) {
        const foodItems = await fetchFoodItems(url);
        renderFoodItems(foodItems, foodItemsContainer);
    }

    // Fetch and render special food items
    async function fetchAndRenderSpecialFoodItems(url) {
        const foodItems = await fetchSpecialFoodItems(url);
        renderFoodItems(foodItems, specialItemsContainer, true);
    }

    // Redirect to food details page
    window.viewDetails = function (foodId) {
        window.location.href = `foodDetails.html?id=${foodId}`;
    };

    // Add to cart function
    window.addToCart = async function (foodId) {
        const quantity = document.getElementById(`quantity-${foodId}`).value;

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
    };

    // Initialize the page
    async function initialize() {
        const categories = await fetchCategories();
        renderCategories(categories);
        fetchAndRenderFoodItems(`${apiBaseUrl}/food-items/`);
        fetchAndRenderSpecialFoodItems(`${apiBaseUrl}/specials/`);
    }

    initialize();
});