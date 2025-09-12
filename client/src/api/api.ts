import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export interface User {
  id: number;
  email: string;
  name?: string;
  orders: Order[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUser {
  email?: string;
  name?: string;
}

export interface Product {
  id: number;
  title: string;
  cost: number;
  img: string;
  categories: Category[];
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProduct {
  title?: string;
  img?: string;
  cost?: number;
  categoryIds?: number[];
}

export interface Category {
  id: number;
  title: string;
  products: Product[];
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  title: string;
  content?: string;
  status: string;
  custom?: User;
  customId?: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  category: Category;
  categoryId: number;
  product: Product;
  productId: number;
  order: Order;
  orderId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  title: string;
  content?: string;
  status: string;
  customId?: number;
  items: Array<{
    productId: number;
    categoryId: number;
    quantity: number;
  }>;
}

export interface UpdateOrderDto {
  title?: string;
  status?: string;
}

export const api = {
  // Products
  products: {
    create: (
      category: Omit<Category, "id" | "createdAt" | "updatedAt" | "products" | "orderItems">
    ): Promise<Category> => axios.post(`${API_BASE_URL}/products`, category).then((res) => res.data),
    getAll: (): Promise<Product[]> => axios.get(`${API_BASE_URL}/products`).then((res) => res.data),
    getById: (id: number): Promise<Product> => axios.get(`${API_BASE_URL}/products/${id}`).then((res) => res.data),
    delete: (id: number): Promise<Product> => axios.get(`${API_BASE_URL}/products/${id}`).then((res) => res.data),
    update: (id: number, body: UpdateProduct) =>
      axios.patch(`${API_BASE_URL}/products/${id}`, body).then((res) => res.data),
  },

  // Categories
  categories: {
    getAll: (): Promise<Category[]> => axios.get(`${API_BASE_URL}/categories`).then((res) => res.data),
    getById: (id: number): Promise<Category> => axios.get(`${API_BASE_URL}/categories/${id}`).then((res) => res.data),
    create: (
      category: Omit<Category, "id" | "createdAt" | "updatedAt" | "products" | "orderItems">
    ): Promise<Category> => axios.post(`${API_BASE_URL}/categories`, category).then((res) => res.data),
    delete: (id: number): Promise<void> => axios.delete(`${API_BASE_URL}/categories/${id}`),
    update: (id: number, body: Pick<Category, "title">): Promise<void> =>
      axios.patch(`${API_BASE_URL}/categories/${id}`, body),
  },

  // Orders
  orders: {
    create: (order: CreateOrderDto): Promise<Order> =>
      axios.post(`${API_BASE_URL}/orders`, order).then((res) => res.data),
    getAll: (): Promise<Order[]> => axios.get(`${API_BASE_URL}/orders`).then((res) => res.data),
    delete: (id: number): Promise<void> => axios.delete(`${API_BASE_URL}/orders/${id}`),
    update: (id: number, body: UpdateOrderDto) =>
      axios.patch(`${API_BASE_URL}/orders/${id}`, body).then((res) => res.data),
  },

  // Users
  users: {
    create: (user: Omit<User, "id" | "createdAt" | "updatedAt" | "orders">): Promise<User> =>
      axios.post(`${API_BASE_URL}/users`, user).then((res) => res.data),
    getAll: (): Promise<User[]> => axios.get(`${API_BASE_URL}/users`).then((res) => res.data),
    delete: (id: number): Promise<void> => axios.delete(`${API_BASE_URL}/users/${id}`),
    update: (id: number, body: UpdateUser) => axios.patch(`${API_BASE_URL}/users/${id}`, body),
  },
};
