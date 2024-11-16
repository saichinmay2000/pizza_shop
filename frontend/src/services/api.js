import axios from 'axios';


const menuServiceAPI = axios.create({ baseURL: 'http://localhost:5002' });  // Menu Service
const orderServiceAPI = axios.create({ baseURL: 'http://localhost:5001' });  // Order Service
const chefServiceAPI = axios.create({ baseURL: 'http://localhost:5003' });  // Chef Service

// Menu Service API Calls
export const getMenuItems = () => menuServiceAPI.get("/menu");
export const addMenuItem = (data) => menuServiceAPI.post("/menu", data);
export const updateMenuItem = (id, data) => menuServiceAPI.patch(`/menu/${id}`, data);
export const deleteMenuItem = (id) => menuServiceAPI.delete(`/menu/${id}`);

// Order Service API Calls
export const placeOrder = (data) => orderServiceAPI.post("/orders", data);
export const getOrders = () => orderServiceAPI.get("/orders");
export const updateOrderStatus = (id, status) => orderServiceAPI.patch(`/orders/${id}/status`, { status });

// Chef Service API Calls
export const calculatePreparationTime = (order) => {
    return chefServiceAPI.post("/chef/process",{ orderId: order });
};
