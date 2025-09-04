import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1>Корзина пуста</h1>
        <Link to="/products" className="continue-shopping">
          Продолжить покупки
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Корзина</h1>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.product.id} className="cart-item">
            <img src={item.product.img} alt={item.product.title} />
            <div className="item-info">
              <h3>{item.product.title}</h3>
              <p>${item.product.cost}</p>
            </div>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
            </div>
            <div className="item-total">${(item.product.cost * item.quantity).toFixed(2)}</div>
            <button onClick={() => removeFromCart(item.product.id)} className="remove-btn">
              Удалить
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total">
          <h3>Итого: ${getTotalPrice().toFixed(2)}</h3>
        </div>
        <div className="cart-actions">
          <button onClick={clearCart} className="clear-btn">
            Очистить корзину
          </button>
          <Link to="/checkout" className="checkout-btn">
            Оформить заказ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
