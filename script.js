let allFoodItems = [];

document.addEventListener("DOMContentLoaded", async function () {
    checkAuthState();
    await loadCategories();
    await loadFoodItems();
});

// Function to check authentication state
function checkAuthState() {
    const token = localStorage.getItem("token");
    if (token) {
        document.getElementById("authenticated").classList.remove("hidden");
        document.getElementById("unauthenticated").classList.add("hidden");
    } else {
        document.getElementById("authenticated").classList.add("hidden");
        document.getElementById("unauthenticated").classList.remove("hidden");
    }
}

// Function to log out user
function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    window.location.reload();
}

// Function to load categories dynamically
async function loadCategories() {
    try {
        const response = await fetch("https://foodie-delight-backend-eta.vercel.app/api/categories/");
        if (!response.ok) throw new Error("Failed to fetch categories");

        const categories = await response.json();
        const categoryDropdown = document.getElementById("filter-category");

        categoryDropdown.innerHTML = `<option value="">All Categories</option>`;
        categories.forEach(category => {
            categoryDropdown.innerHTML += `<option value="${category.slug}">${category.name}</option>`;
        });

        // Add event listener to filter food items when category changes
        categoryDropdown.addEventListener("change", function () {
            filterAndRenderFoodItems(this.value);
        });

    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

// Function to fetch and store all food items
// async function loadFoodItems() {
//     try {
//         const response = await fetch("https://foodie-delight-backend-eta.vercel.app/api/food-items/");
//         if (!response.ok) throw new Error("Failed to fetch food items");

//         allFoodItems = await response.json();
//         renderFoodItems(allFoodItems); // Render all food items initially

//         // Attach event listener for sorting options
//         const sortByDropdown = document.getElementById("sort-by");
//         sortByDropdown.addEventListener("change", function () {
//             sortAndRenderFoodItems(this.value);
//         });
//     } catch (error) {
//         console.error("Error fetching food items:", error);
//     }
// }

async function loadFoodItems(searchQuery = "") {
    try {
        let url = "https://foodie-delight-backend-eta.vercel.app/api/food-items/";
        if (searchQuery) {
            url += `?search=${encodeURIComponent(searchQuery)}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch food items");

        allFoodItems = await response.json();
        renderFoodItems(allFoodItems); // Render all food items initially

        // Attach event listener for sorting options
        const sortByDropdown = document.getElementById("sort-by");
        sortByDropdown.addEventListener("change", function () {
            sortAndRenderFoodItems(this.value);
        });
    } catch (error) {
        console.error("Error fetching food items:", error);
    }
}



// Function to render food items
function renderFoodItems(foodItems) {
    const foodList = document.getElementById("food-list");
    foodList.innerHTML = "";

    if (foodItems.length === 0) {
        foodList.innerHTML = "<p class='text-gray-600'>No food items found.</p>";
        return;
    }

    foodItems.forEach(food => {
        const foodCard = `
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="https://foodie-delight-backend-eta.vercel.app${food.image}" alt="${food.name}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">${food.name}</h3>
                    <p class="text-gray-600">${food.description.slice(0, 50)}...</p>
                    <p class="text-red-500 font-semibold mt-4">
                ${food.pre_discount_price? `<span class="line-through text-gray-400">৳${food.pre_discount_price}</span> 
                       <span class="text-red-500 font-bold">৳${food.price}</span>` 
                    : `৳${food.price}`
                }
            </p>
                    <button onclick="viewDetails(${food.id})" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300">View Details</button>
                    
                </div>
            </div>
        `;
        foodList.innerHTML += foodCard;
        
    });
}

// Function to filter food items based on selected category
function filterAndRenderFoodItems(categorySlug) {
    let filteredFoodItems = allFoodItems;

    if (categorySlug) {
        filteredFoodItems = allFoodItems.filter(food => food.category.slug === categorySlug);
    }

    // After filtering, render the food items
    renderFoodItems(filteredFoodItems);
}

// Function to sort food items based on selected option
function sortAndRenderFoodItems(sortBy) {
    let sortedFoodItems = [...allFoodItems];

    if (sortBy === "price-asc") {
        sortedFoodItems.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
        sortedFoodItems.sort((a, b) => b.price - a.price);
    }

    // After sorting, render the food items
    renderFoodItems(sortedFoodItems);
}

// Function to view product details
function viewDetails(foodId) {
    window.location.href = `foodDetails.html?id=${foodId}`;
}

// Handle search functionality
document.getElementById("search-btn").addEventListener("click", function () {
    const searchQuery = document.getElementById("search-bar").value.trim();
    console.log(searchQuery);
    
    loadFoodItems(searchQuery);
});


async function loadSpecials() {
    try {
        const response = await fetch("https://foodie-delight-backend-eta.vercel.app/api/specials/");
        if (!response.ok) throw new Error("Failed to fetch specials");

        const specials = await response.json();
        renderSpecials(specials);
    } catch (error) {
        console.error("Error fetching specials:", error);
    }
}

function renderSpecials(specials) {
    const specialsSection = document.getElementById("specials-list");
    specialsSection.innerHTML = "";

    if (specials.length === 0) {
        specialsSection.innerHTML = "<p class='text-gray-600'>No specials available.</p>";
        return;
    }

    specials.forEach(food => {
        const foodCard = `
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="https://foodie-delight-backend-eta.vercel.app${food.image}" alt="${food.name}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">${food.name}</h3>
                    <p class="text-gray-600">${food.description.slice(0, 50)}...</p>
                    <p class="text-red-500 font-semibold mt-4">
                        <span class="line-through text-gray-400">৳${food.pre_discount_price}</span> ৳${food.price}
                    </p>
                    <button onclick="viewDetails(${food.id})" class="mt-4 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300">View Details</button>
                </div>
            </div>
        `;
        specialsSection.innerHTML += foodCard;
    });
}

// Call loadSpecials on page load
document.addEventListener("DOMContentLoaded", function () {
    loadSpecials();
});


