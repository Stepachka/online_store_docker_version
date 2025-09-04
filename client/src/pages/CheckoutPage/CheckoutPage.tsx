import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { api } from "../../api/api";
import "./CheckoutPage.css";

const CheckoutPage: React.FC = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Создаем пользователя
      const user = await api.users.create({
        email: formData.email,
        name: formData.name,
      });

      // Создаем заказ
      await api.orders.create({
        title: `Заказ от ${formData.name}`,
        content: `Адрес доставки: ${formData.address}, Телефон: ${formData.phone}`,
        status: "pending",
        customId: user.id,
        items: cartItems.map((item) => ({
          productId: item.product.id,
          categoryId: item.product.categories[0]?.id || 1,
          quantity: item.quantity,
        })),
      });

      // Очищаем корзину и перенаправляем
      clearCart();
      // navigate("/order-success", { state: { orderId: order.id } });
      alert("Заказ успешно создан");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Ошибка при оформлении заказа");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <h2>Корзина пуста</h2>
        <button onClick={() => navigate("/products")}>Вернуться к товарам</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Оформление заказа</h1>

      <div className="checkout-content">
        <div className="order-summary">
          <h3>Ваш заказ</h3>
          {cartItems.map((item) => (
            <div key={item.product.id} className="order-item">
              <span>
                {item.product.title} x {item.quantity}
              </span>
              <span>${(item.product.cost * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="order-total">
            <strong>Итого: ${getTotalPrice().toFixed(2)}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Данные для доставки</h3>

          <input
            type="text"
            placeholder="ФИО"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <input
            type="tel"
            placeholder="Телефон"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />

          <textarea
            placeholder="Адрес доставки"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Оформление..." : "Подтвердить заказ"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
