import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api, Product } from "../../api/api";
import ProductCard from "../../components/ProductCard";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await api.products.getAll();
        setFeaturedProducts(products.slice(0, 6)); // Первые 6 товаров
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div className="loading">Загрузка...</div>;

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Добро пожаловать в наш магазин</h1>
        <p>Лучшие товары по лучшим ценам</p>
        <Link to="/products" className="cta-button">
          Смотреть все товары
        </Link>
      </section>

      <section className="featured-products">
        <h2>Популярные товары</h2>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
