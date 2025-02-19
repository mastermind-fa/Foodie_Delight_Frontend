document.addEventListener('DOMContentLoaded', function () {
    const apiBaseUrl = 'https://foodie-delight-backend-eta.vercel.app/api';
    const categoriesContainer = document.getElementById('categories-container');
    const foodItemsContainer = document.getElementById('food-items-container');
    const specialItemsContainer = document.getElementById('special-items-container');

    async function fetchData(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    async function renderCategories() {
        const categories = await fetchData(`${apiBaseUrl}/categories/`);
        categoriesContainer.innerHTML = '';

        const allButton = createCategoryButton('All Categories', `${apiBaseUrl}/food-items/`);
        categoriesContainer.appendChild(allButton);

        categories.forEach(category => {
            const button = createCategoryButton(category.name, `${apiBaseUrl}/categories/${category.slug}/food-items/`);
            categoriesContainer.appendChild(button);
        });
    }

    function createCategoryButton(name, url) {
        const button = document.createElement('button');
        button.className = 'bg-green-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:-translate-y-1';
        button.textContent = name;
        button.addEventListener('click', () => fetchAndRenderFoodItems(url));
        return button;
    }

    function renderFoodItems(foodItems, container, isSpecial = false) {
        container.innerHTML = '';
        foodItems.forEach(food => {
            const card = document.createElement('div');
            card.className = 'bg-white p-4 rounded-lg shadow-md transform transition duration-300 hover:-translate-y-2';
            card.innerHTML = `
                <a href="javascript:void(0);" onclick="viewDetails(${food.id})">
                    <img src="https://foodie-delight-backend-eta.vercel.app${food.image}" alt="${food.name}" class="w-full rounded-md cursor-pointer">
                </a>
                <h3 class="text-xl font-semibold mt-4">${food.name}</h3>
                <p class="text-green-600 font-medium">4.8/5 Excellent (1214 reviews)</p>
                <p class="text-red-500 font-semibold mt-4">
                    ${food.pre_discount_price ? `
                        <span class="line-through text-gray-400">৳${food.price}</span>
                        <span class="text-red-500 font-bold">৳${food.pre_discount_price}</span>
                    ` : `৳${food.price}`}
                </p>
                <div class="flex items-center gap-2 mt-3">
                    <label for="quantity-${food.id}" class="text-gray-700">Qty:</label>
                    <input type="number" id="quantity-${food.id}" min="1" value="1" class="w-16 p-1 border rounded-md">
                </div>
                <button class="bg-green-500 text-white px-4 py-2 mt-3 w-full rounded-lg" onclick="addToCart(${food.id})">Add To Cart</button>
            `;
            container.appendChild(card);
        });
    }

    async function fetchAndRenderFoodItems(url) {
        const foodItems = await fetchData(url);
        renderFoodItems(foodItems, foodItemsContainer);
    }

    async function fetchAndRenderSpecialFoodItems() {
        const specialItems = await fetchData(`${apiBaseUrl}/specials/`);
        renderFoodItems(specialItems, specialItemsContainer, true);
    }

    window.viewDetails = function (foodId) {
        window.location.href = `foodDetails.html?id=${foodId}`;
    };

    window.addToCart = async function (foodId) {
        const quantity = document.getElementById(`quantity-${foodId}`).value;
        if (quantity < 1) {
            alert("Please enter a valid quantity.");
            return;
        }

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
                body: JSON.stringify({ food_item_id: foodId, quantity: parseInt(quantity) }),
            });

            if (response.ok) {
                alert("Food item added to cart!");
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error || 'Failed to add to cart'}`);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add food to cart. Please try again.");
        }
    };

    renderCategories();
    fetchAndRenderFoodItems(`${apiBaseUrl}/food-items/`);
    fetchAndRenderSpecialFoodItems();
});
