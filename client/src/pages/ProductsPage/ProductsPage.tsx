import React, { useState, useEffect } from "react";
import "./ProductsPage.css";
import { api, Product } from "../../api/api";
import ProductCard from "../../components/ProductCard";

const ProductsPage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await api.products.getAll();
        setFeaturedProducts(products);
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
      <div className="products-grid">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
