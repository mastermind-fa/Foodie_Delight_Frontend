
// Fetch Orders from API
async function fetchOrders() {
    try {
        const response = await fetch('https://foodie-delight-backend-eta.vercel.app/api/admin/orders/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`, // Add your authorization token
            },
        });
        const orders = await response.json();
        renderOrders(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}

// Render Orders in Table
function renderOrders(orders) {
    const ordersTableBody = document.getElementById('ordersTableBody');
    ordersTableBody.innerHTML = orders.map(order => `
        <tr class="border-b">
            <td class="px-4 py-2">${order.id}</td>
            <td class="px-4 py-2">${order.customer}</td>
            <td class="px-4 py-2">$${order.total_price}</td>
            <td class="px-4 py-2">
                <select onchange="updateOrderStatus(${order.id}, this.value)" class="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                    <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    <option value="Paid" ${order.status === 'Paid' ? 'selected' : ''}>Paid</option>
                </select>
            </td>
            <td class="px-4 py-2">${new Date(order.created_at).toLocaleString()}</td>
            <td class="px-4 py-2">
                <input
                    type="datetime-local"
                    value="${order.estimated_delivery_time ? new Date(order.estimated_delivery_time).toISOString().slice(0, 16) : ''}"
                    onchange="updateEstimatedDeliveryTime(${order.id}, this.value)"
                    class="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </td>
            <td class="px-4 py-2">
                <ul class="list-disc list-inside">
                    ${order.items.map(item => `
                        <li>${item.food_item.name} (x${item.quantity})</li>
                    `).join('')}
                </ul>
            </td>
        </tr>
    `).join('');
}

// Update Order Status
async function updateOrderStatus(orderId, status) {
    try {
        const response = await fetch(`https://foodie-delight-backend-eta.vercel.app/api/admin/orders/${orderId}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`, // Add your authorization token
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });

        if (response.ok) {
            alert('Order status updated successfully!');
            fetchOrders(); // Refresh the orders list
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.detail || 'Failed to update order status'}`);
        }
    } catch (error) {
        console.error('Error updating order status:', error);
        alert('An error occurred while updating the order status.');
    }
}

// Update Estimated Delivery Time
async function updateEstimatedDeliveryTime(orderId, estimatedDeliveryTime) {
    try {
        const response = await fetch(`https://foodie-delight-backend-eta.vercel.app/api/admin/orders/${orderId}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`, // Add your authorization token
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estimated_delivery_time: estimatedDeliveryTime }),
        });

        if (response.ok) {
            alert('Estimated delivery time updated successfully!');
            fetchOrders(); // Refresh the orders list
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.detail || 'Failed to update estimated delivery time'}`);
        }
    } catch (error) {
        console.error('Error updating estimated delivery time:', error);
        alert('An error occurred while updating the estimated delivery time.');
    }
}

// Fetch orders on page load
fetchOrders();