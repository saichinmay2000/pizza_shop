const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4">
                <nav className="container mx-auto flex justify-between">
                    <h1 className="text-2xl font-bold">Pizza Shop</h1>
                    <ul className="flex gap-4">
                        <li><a href="/" className="hover:underline">Menu</a></li>
                        {/* <li><a href="/cart" className="hover:underline">Cart</a></li> */}
                        <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
                    </ul>
                </nav>
            </header>
            <main className="flex-grow container mx-auto p-4">{children}</main>
            <footer className="bg-gray-800 text-white text-center p-4">
                © 2024 Pizza Shop
            </footer>
        </div>
    );
};

export default Layout;
