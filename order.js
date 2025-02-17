document.addEventListener("DOMContentLoaded", async () => {
    const ordersContainer = document.getElementById("orders-container");

    try {
        const response = await fetch("https://foodie-delight-backend-eta.vercel.appapi/orders/", {
            method: "GET",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
            },
        });
        const orders = await response.json();

        if (orders.length === 0) {
            ordersContainer.innerHTML = `<p class="text-center text-gray-600">No orders found.</p>`;
            return;
        }

        orders.forEach(order => {
            const orderElement = document.createElement("div");
            orderElement.classList.add("bg-white", "p-6", "rounded-lg", "shadow-md");

            let itemsHTML = order.items.map(item => `
                <div class="flex items-center space-x-4 border-b pb-4">
                    <img src="https://foodie-delight-backend-eta.vercel.app${item.food_item.image}" alt="${item.food_item.name}" class="w-16 h-16 object-cover rounded">
                    <div>
                        <h3 class="text-lg font-semibold">${item.food_item.name}</h3>
                        <p class="text-sm text-gray-600">${item.food_item.description}</p>
                        <p class="text-sm font-medium text-gray-800">Quantity: ${item.quantity}</p>
                        <p class="text-sm font-semibold text-blue-600">Price: $${item.food_item.price}</p>
                    </div>
                </div>
            `).join("");

            orderElement.innerHTML = `
                <h2 class="text-xl font-semibold text-gray-700">Order #${order.id}</h2>
                <p class="text-sm text-gray-500">Status: <span class="font-medium text-${order.status === 'Pending' ? 'yellow' : 'green'}-500">${order.status}</span></p>
                <p class="text-sm text-gray-500">Total Price: <span class="font-medium">$${order.total_price}</span></p>
                <p class="text-sm text-gray-500">Placed On: ${new Date(order.created_at).toLocaleString()}</p>
                <div class="mt-4 space-y-4">${itemsHTML}</div>
            `;

            ordersContainer.appendChild(orderElement);
        });
    } catch (error) {
        ordersContainer.innerHTML = `<p class="text-center text-red-500">Error loading orders. Please try again later.</p>`;
    }
});
