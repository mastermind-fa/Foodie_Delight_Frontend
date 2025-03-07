

// Fetch All Menus
async function fetchAllMenus() {
    try {
        const response = await fetch('https://foodie-delight-backend-eta.vercel.app/api/food-items/');
        const data = await response.json();
        const menuTableBody = document.getElementById('menuTableBody');

        // Clear existing rows
        menuTableBody.innerHTML = '';

        // Populate the table with menu data
        data.forEach(menu => {
            const row = document.createElement('tr');
            row.className = 'border-b';

            // Calculate discount percentage
            const discountPercentage = menu.pre_discount_price
                ? ((menu.price - menu.pre_discount_price) / menu.price * 100).toFixed(2)
                : '0.00';

            row.innerHTML = `
                <td class="px-4 py-2 flex items-center space-x-2">
                    <img src="https://foodie-delight-backend-eta.vercel.app${menu.image || 'https://via.placeholder.com/50'}" alt="${menu.name}"
                        class="w-10 h-10 rounded-full">
                    <span>${menu.name}</span>
                </td>
                <td class="px-4 py-2">$${menu.price}</td>
                <td class="px-4 py-2">${discountPercentage}%</td>
                <td class="px-4 py-2">
                    <button class="text-blue-500 hover:text-blue-700">✏️</button>
                    <button onclick="deleteMenu(${menu.id})" class="text-red-500 hover:text-red-700 ml-2">🗑️</button>
                </td>
            `;

            menuTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching menus:', error);
    }
}

// Delete Menu
async function deleteMenu(menuId) {
    if (!confirm('Are you sure you want to delete this menu item?')) {
        return;
    }

    try {
        const response = await fetch(`https://foodie-delight-backend-eta.vercel.app/api/food-items/${menuId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`, // Add your authorization token
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert('Menu item deleted successfully!');
            fetchAllMenus(); // Refresh the table
        } else {
            alert('Failed to delete menu item. Please try again.');
        }
    } catch (error) {
        console.error('Error deleting menu:', error);
        alert('An error occurred while deleting the menu item.');
    }
}

// Initialize
fetchAllMenus();