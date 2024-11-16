import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import { useState } from 'react';

function App() {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem.id === item.itemId);
    
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.id === item.itemId
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };
    

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Menu addToCart={addToCart} />} />
                    <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
