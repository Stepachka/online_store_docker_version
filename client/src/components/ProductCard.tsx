import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../api/api";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.img || "/placeholder-product.jpg"} alt={product.title} />
        <h3>{product.title}</h3>
        <p className="price">${product.cost}</p>
        <div className="categories">
          {product.categories.map((cat) => (
            <span key={cat.id} className="category-tag">
              {cat.title}
            </span>
          ))}
        </div>
      </Link>
      <button onClick={handleAddToCart} className="add-to-cart-btn">
        Добавить в корзину
      </button>
    </div>
  );
};

export default ProductCard;
