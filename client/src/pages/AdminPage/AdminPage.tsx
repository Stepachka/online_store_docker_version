import React, { useState, useEffect } from "react";
import { api, Product, Order, User, Category, UpdateProduct, UpdateUser } from "../../api/api";
import "./AdminPage.css";

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  // Формы для создания новых элементов
  const [newProduct, setNewProduct] = useState({
    title: "",
    cost: 0,
    img: "",
    categoryIds: [] as number[],
  });
  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
  });
  const [newCategory, setNewCategory] = useState({
    title: "",
  });

  // Формы для редактирования
  const [editProduct, setEditProduct] = useState<UpdateProduct>({});
  const [editUser, setEditUser] = useState<UpdateUser>({});
  const [editCategory, setEditCategory] = useState({ title: "" });
  const [editOrder, setEditOrder] = useState({
    status: "",
    title: "",
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, ordersData, usersData, categoriesData] = await Promise.all([
        api.products.getAll(),
        api.orders.getAll(),
        api.users.getAll(),
        api.categories.getAll(),
      ]);
      setProducts(productsData);
      setOrders(ordersData);
      setUsers(usersData as any);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.products.create(newProduct);
      setNewProduct({ title: "", cost: 0, img: "", categoryIds: [] });
      setShowForm(false);
      loadData();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.users.create(newUser);
      setNewUser({ email: "", name: "" });
      setShowForm(false);
      loadData();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.categories.create(newCategory);
      setNewCategory({ title: "" });
      setShowForm(false);
      loadData();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleDelete = async (type: string, id: number) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот элемент?")) return;

    try {
      switch (type) {
        case "product":
          await api.products.delete(id);
          break;
        case "user":
          await api.users.delete(id);
          break;
        case "order":
          await api.orders.delete(id);
          break;
        case "category":
          await api.categories.delete(id);
          break;
      }
      loadData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (item: any, type: string) => {
    setEditingItem({ ...item, type });

    // Заполняем форму редактирования данными элемента
    switch (type) {
      case "product":
        setEditProduct({
          title: item.title,
          cost: item.cost,
          img: item.img,
          categoryIds: item.categories.map((c: Category) => c.id),
        });
        break;
      case "user":
        setEditUser({
          email: item.email,
          name: item.name,
        });
        break;
      case "category":
        setEditCategory({ title: item.title });
        break;
      case "order":
        setEditOrder({
          status: item.status,
          title: item.title,
        });
        break;
    }
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;

    try {
      switch (editingItem.type) {
        case "product":
          await api.products.update(editingItem.id, editProduct);
          break;
        case "user":
          console.log(editingItem, editUser);
          await api.users.update(editingItem.id, editUser);
          break;
        case "category":
          await api.categories.update(editingItem.id, editCategory);
          break;
        case "order":
          await api.orders.update(editingItem.id, editOrder);
          console.log("daf");
          break;
      }

      setEditingItem(null);
      loadData();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  if (loading) return <div className="loading">Загрузка...</div>;

  return (
    <div className="admin-page">
      <h1>Панель администратора</h1>

      <div className="admin-tabs">
        <button onClick={() => setActiveTab("products")} className={activeTab === "products" ? "active" : ""}>
          Товары ({products.length})
        </button>
        <button onClick={() => setActiveTab("orders")} className={activeTab === "orders" ? "active" : ""}>
          Заказы ({orders.length})
        </button>
        <button onClick={() => setActiveTab("users")} className={activeTab === "users" ? "active" : ""}>
          Пользователи ({users.length})
        </button>
        <button onClick={() => setActiveTab("categories")} className={activeTab === "categories" ? "active" : ""}>
          Категории ({categories.length})
        </button>
      </div>

      <div className="admin-actions">
        <button onClick={() => setShowForm(!showForm)} className="add-btn">
          {showForm ? "Отменить" : "+ Добавить новый"}
        </button>
      </div>

      {showForm && (
        <div className="create-form">
          {activeTab === "products" && (
            <form onSubmit={handleCreateProduct}>
              <h3>Создать новый товар</h3>
              <input
                type="text"
                placeholder="Название товара"
                value={newProduct.title}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Цена"
                value={newProduct.cost}
                onChange={(e) => setNewProduct({ ...newProduct, cost: parseFloat(e.target.value) })}
                required
              />
              <input
                type="text"
                placeholder="URL изображения"
                value={newProduct.img}
                onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })}
                required
              />
              <select
                multiple
                value={newProduct.categoryIds.map(String)}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    categoryIds: Array.from(e.target.selectedOptions, (option) => parseInt(option.value)),
                  })
                }
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
              <button type="submit">Создать товар</button>
            </form>
          )}

          {activeTab === "users" && (
            <form onSubmit={handleCreateUser}>
              <h3>Создать нового пользователя</h3>
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Имя"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <button type="submit">Создать пользователя</button>
            </form>
          )}

          {activeTab === "categories" && (
            <form onSubmit={handleCreateCategory}>
              <h3>Создать новую категорию</h3>
              <input
                type="text"
                placeholder="Название категории"
                value={newCategory.title}
                onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                required
              />
              <button type="submit">Создать категорию</button>
            </form>
          )}
        </div>
      )}

      {/* Модальное окно редактирования */}
      {editingItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Редактирование {editingItem.type}</h3>

            {editingItem.type === "product" && (
              <div className="edit-form">
                <input
                  type="text"
                  placeholder="Название товара"
                  value={editProduct.title || ""}
                  onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Цена"
                  value={editProduct.cost || 0}
                  onChange={(e) => setEditProduct({ ...editProduct, cost: parseFloat(e.target.value) })}
                />
                <input
                  type="text"
                  placeholder="URL изображения"
                  value={editProduct.img || ""}
                  onChange={(e) => setEditProduct({ ...editProduct, img: e.target.value })}
                />
                <select
                  multiple
                  value={(editProduct.categoryIds || []).map(String)}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      categoryIds: Array.from(e.target.selectedOptions, (option) => parseInt(option.value)),
                    })
                  }
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {editingItem.type === "user" && (
              <div className="edit-form">
                <input
                  type="email"
                  placeholder="Email"
                  value={editUser.email || ""}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Имя"
                  value={editUser.name || ""}
                  onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                />
              </div>
            )}

            {editingItem.type === "category" && (
              <div className="edit-form">
                <input
                  type="text"
                  placeholder="Название категории"
                  value={editCategory.title}
                  onChange={(e) => setEditCategory({ title: e.target.value })}
                />
              </div>
            )}

            {editingItem.type === "order" && (
              <div className="edit-form">
                <input
                  type="text"
                  placeholder="Название заказа"
                  value={editOrder.title}
                  onChange={(e) => setEditOrder({ ...editOrder, title: e.target.value })}
                />
                <select
                  value={editOrder.status}
                  onChange={(e) => setEditOrder({ ...editOrder, status: e.target.value })}
                >
                  <option value="pending">В обработке</option>
                  <option value="processing">В процессе</option>
                  <option value="completed">Завершен</option>
                  <option value="cancelled">Отменен</option>
                </select>
              </div>
            )}

            <div className="modal-actions">
              <button onClick={handleCancelEdit}>Отмена</button>
              <button onClick={handleSaveEdit} className="save-btn">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-content">
        {activeTab === "products" && (
          <div className="products-list">
            <h3>Товары</h3>
            {products.map((product) => (
              <div key={product.id} className="admin-item">
                <img src={product.img} alt={product.title} />
                <div className="item-info">
                  <h4>{product.title}</h4>
                  <p>${product.cost}</p>
                  <p>Категории: {product.categories.map((c) => c.title).join(", ")}</p>
                </div>
                <div className="item-actions">
                  <button onClick={() => handleEdit(product, "product")}>✏️</button>
                  <button onClick={() => handleDelete("product", product.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "orders" && (
          <div className="orders-list">
            <h3>Заказы</h3>
            {orders.map((order) => (
              <div key={order.id} className="admin-item" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="item-info">
                  <h4>{order.title}</h4>
                  <p>Статус: {order.status}</p>
                  <p>Клиент: {order.custom?.name || order.custom?.email || "Гость"}</p>
                  <p>Товаров: {order.items.length}</p>
                  <p>
                    Сумма: ${order.items.reduce((sum, item) => sum + item.product.cost * item.quantity, 0).toFixed(2)}
                  </p>
                </div>
                <div className="item-actions">
                  <button onClick={() => handleEdit(order, "order")}>✏️</button>
                  <button onClick={() => handleDelete("order", order.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "users" && (
          <div className="users-list">
            <h3>Пользователи</h3>
            {users.map((user) => (
              <div key={user.id} className="admin-item" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="item-info">
                  <h4>{user.name || "Без имени"}</h4>
                  <p>Email: {user.email}</p>
                  <p>Заказов: {user.orders.length}</p>
                </div>
                <div className="item-actions">
                  <button onClick={() => handleEdit(user, "user")}>✏️</button>
                  <button onClick={() => handleDelete("user", user.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "categories" && (
          <div className="categories-list">
            <h3>Категории</h3>
            {categories.map((category) => (
              <div
                key={category.id}
                className="admin-item"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="item-info">
                  <h4>{category.title}</h4>
                  <p>Товаров: {category.products.length}</p>
                </div>
                <div className="item-actions">
                  <button onClick={() => handleEdit(category, "category")}>✏️</button>
                  <button onClick={() => handleDelete("category", category.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
