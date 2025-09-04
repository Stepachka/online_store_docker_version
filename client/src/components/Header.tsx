import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";

const Header: React.FC = () => {
  const { getTotalItems } = useCart();

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          🛒 Магазин
        </Link>

        <nav className="nav">
          <Link to="/products">Товары</Link>
          <Link to="/cart">Корзина ({getTotalItems()})</Link>
          <Link to="/admin">Админка</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
