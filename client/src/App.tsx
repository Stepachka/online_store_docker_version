import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CartPage from "./components/CartPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage/HomePage";
import { CartProvider } from "./context/CartContext";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
