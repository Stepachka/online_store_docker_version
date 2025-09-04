import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api, Product } from "../../api/api";
import { useCart } from "../../context/CartContext";
import "./ProductDetailPage.css";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (id) {
          const productData = await api.products.getById(parseInt(id));
          console.log("productData", productData);
          setProduct(productData);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (!product) return <div className="error">Товар не найден</div>;

  return (
    <div className="product-detail">
      <Link to="/products" className="back-link">
        ← Назад к товарам
      </Link>

      <div className="product-detail-content">
        <img src={product.img} alt={product.title} className="product-image" />

        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="price">${product.cost}</p>

          <div className="categories">
            {product.categories.map((category) => (
              <span key={category.id} className="category-tag">
                {category.title}
              </span>
            ))}
          </div>

          <button onClick={() => addToCart(product)} className="add-to-cart-btn large">
            Добавить в корзину
          </button>

          <div className="description">
            <h3>Описание</h3>
            <p>Отличный товар высокого качества. Идеально подходит для повседневного использования.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
