import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../services/api";

const Dashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders().then((res) => setOrders(res.data));
    }, []);

    const handleStatusUpdate = (id, status) => {
        updateOrderStatus(id, status).then(() =>
            setOrders((prev) =>
                prev.map((order) => (order._id === id ? { ...order, status } : order))
            )
        );
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
            <table className="min-w-full bg-white rounded shadow">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 text-left">Order ID</th>
                        <th className="p-3 text-left">Customer</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id} className="border-b">
                            <td className="p-3">{order._id}</td>
                            <td className="p-3">{order.customerId}</td>
                            <td className="p-3">{order.status}</td>
                            <td className="p-3">
                                {order.status === "pending" && (
                                    <button
                                        onClick={() => handleStatusUpdate(order._id, "in progress")}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        Start
                                    </button>
                                )}
                                {order.status === "in progress" && (
                                    <button
                                        onClick={() => handleStatusUpdate(order._id, "completed")}
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        Complete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
