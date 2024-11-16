import { useEffect, useState } from "react";
import { getMenuItems } from "../services/api";
import { Link } from 'react-router-dom';

const Menu = ({ addToCart }) => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        getMenuItems().then((res) => setMenu(res.data));
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Our Menu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {menu.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 shadow hover:shadow-lg">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p className="text-gray-600">{item.type}</p>
                        <p className="text-green-600 font-bold">${item.price.toFixed(2)}</p>
                        <button
                            onClick={() => addToCart(item)}
                            className="bg-blue-500 text-white py-1 px-3 mt-2 rounded hover:bg-blue-600"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            <Link to="/cart" className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                Go to Cart
            </Link>
        </div>
    );
};

export default Menu;
