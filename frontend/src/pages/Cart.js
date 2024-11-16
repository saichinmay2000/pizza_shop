import { useState } from "react";
import { calculatePreparationTime } from "../services/api";

const Cart = ({ cart, setCart, customerId }) => {
    const [preparationTime, setPreparationTime] = useState(null);
    const [orderStatus, setOrderStatus] = useState("");

    console.log(preparationTime);



    const updateQuantity = (id, quantity) => {
        setCart(cart.map(item => (item.itemId === id ? { ...item, quantity } : item)));
    };


    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);


    const handlePlaceOrder = () => {
        const orderData = {
            customerId: "12345",
            items: cart.map(item => ({
                itemId: item._id,
                type: item.type,
                quantity: item.quantity
            })),
            totalAmount: totalPrice
        };

        // send the POST request to place the order
        fetch("http://localhost:5001/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        })
            .then(response => response.json())
            .then(data => {
                setOrderStatus(`Order placed successfully! Order ID: ${data._id}`);

                calculatePreparationTime(data._id)
                    .then(response => {
                        setPreparationTime(response.data.estimatedTime);
                        console.log('Preparation Time:', response);
                    })
                    .catch(error => {
                        console.error('Error calculating preparation time:', error);
                    });
                console.log(calculatePreparationTime(data._id));
            })
            .catch(error => {
                console.error('Error placing the order:', error);
            });
    };



    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
            <div className="space-y-4">
                {cart.length === 0 ? (
                    <p>Your cart is empty. Add items from the menu!</p>
                ) : (
                    cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg">{item.name}</h3>
                                <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    value={item.quantity}
                                    min="1"
                                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                    className="w-16 p-2 border rounded"
                                />
                                <span className="text-gray-600">x ${item.price.toFixed(2)}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="mt-6 text-right">
                {cart.length > 0 && (
                    <>
                        <h3 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>
                        <button
                            onClick={handlePlaceOrder}
                            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 mt-2"
                        >
                            Place Order
                        </button>
                        {orderStatus && (
                            <p className="mt-4 text-xl">{orderStatus}</p>
                        )}
                        {preparationTime && (
                            <p className="mt-4 text-xl">Estimated Preparation Time: {preparationTime} minutes</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
