import axios from 'axios';
import { api } from './api';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Products API', () => {
    const mockProduct = {
      id: 1,
      title: 'Test Product',
      cost: 100,
      img: 'test-image.jpg',
      categories: [],
      orderItems: [],
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    describe('create', () => {
      it('should create a product', async () => {
        const createData = {
          title: 'Test Product',
          cost: 100,
          img: 'test-image.jpg',
          categoryIds: [1, 2],
        };

        mockedAxios.post.mockResolvedValueOnce({ data: mockProduct });

        const result = await api.products.create(createData);

        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:3001/products',
          createData
        );
        expect(result).toEqual(mockProduct);
      });

      it('should handle create product errors', async () => {
        const createData = {
          title: 'Test Product',
          cost: 100,
          img: 'test-image.jpg',
          categoryIds: [1, 2],
        };

        const error = new Error('Network error');
        mockedAxios.post.mockRejectedValueOnce(error);

        await expect(api.products.create(createData)).rejects.toThrow(error);
        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:3001/products',
          createData
        );
      });
    });

    describe('getAll', () => {
      it('should get all products', async () => {
        const products = [mockProduct];
        mockedAxios.get.mockResolvedValueOnce({ data: products });

        const result = await api.products.getAll();

        expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/products');
        expect(result).toEqual(products);
      });

      it('should handle get all products errors', async () => {
        const error = new Error('Network error');
        mockedAxios.get.mockRejectedValueOnce(error);

        await expect(api.products.getAll()).rejects.toThrow(error);
        expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/products');
      });
    });

    describe('getById', () => {
      it('should get product by id', async () => {
        const id = 1;
        mockedAxios.get.mockResolvedValueOnce({ data: mockProduct });

        const result = await api.products.getById(id);

        expect(mockedAxios.get).toHaveBeenCalledWith(`http://localhost:3001/products/${id}`);
        expect(result).toEqual(mockProduct);
      });

      it('should handle get product by id errors', async () => {
        const id = 1;
        const error = new Error('Product not found');
        mockedAxios.get.mockRejectedValueOnce(error);

        await expect(api.products.getById(id)).rejects.toThrow(error);
        expect(mockedAxios.get).toHaveBeenCalledWith(`http://localhost:3001/products/${id}`);
      });
    });

    describe('delete', () => {
      it('should delete a product', async () => {
        const id = 1;
        mockedAxios.get.mockResolvedValueOnce({ data: mockProduct });

        const result = await api.products.delete(id);

        expect(mockedAxios.get).toHaveBeenCalledWith(`http://localhost:3001/products/${id}`);
        expect(result).toEqual(mockProduct);
      });

      it('should handle delete product errors', async () => {
        const id = 1;
        const error = new Error('Delete failed');
        mockedAxios.get.mockRejectedValueOnce(error);

        await expect(api.products.delete(id)).rejects.toThrow(error);
        expect(mockedAxios.get).toHaveBeenCalledWith(`http://localhost:3001/products/${id}`);
      });
    });

    describe('update', () => {
      it('should update a product', async () => {
        const id = 1;
        const updateData = {
          title: 'Updated Product',
          cost: 150,
        };

        const updatedProduct = { ...mockProduct, ...updateData };
        mockedAxios.patch.mockResolvedValueOnce({ data: updatedProduct });

        const result = await api.products.update(id, updateData);

        expect(mockedAxios.patch).toHaveBeenCalledWith(
          `http://localhost:3001/products/${id}`,
          updateData
        );
        expect(result).toEqual(updatedProduct);
      });

      it('should handle update product errors', async () => {
        const id = 1;
        const updateData = {
          title: 'Updated Product',
          cost: 150,
        };

        const error = new Error('Update failed');
        mockedAxios.patch.mockRejectedValueOnce(error);

        await expect(api.products.update(id, updateData)).rejects.toThrow(error);
        expect(mockedAxios.patch).toHaveBeenCalledWith(
          `http://localhost:3001/products/${id}`,
          updateData
        );
      });
    });
  });

  describe('Categories API', () => {
    const mockCategory = {
      id: 1,
      title: 'Test Category',
      products: [],
      orderItems: [],
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    describe('getAll', () => {
      it('should get all categories', async () => {
        const categories = [mockCategory];
        mockedAxios.get.mockResolvedValueOnce({ data: categories });

        const result = await api.categories.getAll();

        expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/categories');
        expect(result).toEqual(categories);
      });

      it('should handle get all categories errors', async () => {
        const error = new Error('Network error');
        mockedAxios.get.mockRejectedValueOnce(error);

        await expect(api.categories.getAll()).rejects.toThrow(error);
        expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/categories');
      });
    });

    describe('getById', () => {
      it('should get category by id', async () => {
        const id = 1;
        mockedAxios.get.mockResolvedValueOnce({ data: mockCategory });

        const result = await api.categories.getById(id);

        expect(mockedAxios.get).toHaveBeenCalledWith(`http://localhost:3001/categories/${id}`);
        expect(result).toEqual(mockCategory);
      });

      it('should handle get category by id errors', async () => {
        const id = 1;
        const error = new Error('Category not found');
        mockedAxios.get.mockRejectedValueOnce(error);

        await expect(api.categories.getById(id)).rejects.toThrow(error);
        expect(mockedAxios.get).toHaveBeenCalledWith(`http://localhost:3001/categories/${id}`);
      });
    });

    describe('create', () => {
      it('should create a category', async () => {
        const createData = {
          title: 'Test Category',
        };

        mockedAxios.post.mockResolvedValueOnce({ data: mockCategory });

        const result = await api.categories.create(createData);

        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:3001/categories',
          createData
        );
        expect(result).toEqual(mockCategory);
      });

      it('should handle create category errors', async () => {
        const createData = {
          title: 'Test Category',
        };

        const error = new Error('Network error');
        mockedAxios.post.mockRejectedValueOnce(error);

        await expect(api.categories.create(createData)).rejects.toThrow(error);
        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:3001/categories',
          createData
        );
      });
    });

    describe('delete', () => {
      it('should delete a category', async () => {
        const id = 1;
        mockedAxios.delete.mockResolvedValueOnce({ data: undefined });

        await api.categories.delete(id);

        expect(mockedAxios.delete).toHaveBeenCalledWith(`http://localhost:3001/categories/${id}`);
      });

      it('should handle delete category errors', async () => {
        const id = 1;
        const error = new Error('Delete failed');
        mockedAxios.delete.mockRejectedValueOnce(error);

        await expect(api.categories.delete(id)).rejects.toThrow(error);
        expect(mockedAxios.delete).toHaveBeenCalledWith(`http://localhost:3001/categories/${id}`);
      });
    });

    describe('update', () => {
      it('should update a category', async () => {
        const id = 1;
        const updateData = {
          title: 'Updated Category',
        };

        mockedAxios.patch.mockResolvedValueOnce({ data: undefined });

        await api.categories.update(id, updateData);

        expect(mockedAxios.patch).toHaveBeenCalledWith(
          `http://localhost:3001/categories/${id}`,
          updateData
        );
      });

      it('should handle update category errors', async () => {
        const id = 1;
        const updateData = {
          title: 'Updated Category',
        };

        const error = new Error('Update failed');
        mockedAxios.patch.mockRejectedValueOnce(error);

        await expect(api.categories.update(id, updateData)).rejects.toThrow(error);
        expect(mockedAxios.patch).toHaveBeenCalledWith(
          `http://localhost:3001/categories/${id}`,
          updateData
        );
      });
    });
  });

  describe('Orders API', () => {
    const mockOrder = {
      id: 1,
      title: 'Test Order',
      content: 'Test content',
      status: 'pending',
      customId: 1,
      items: [],
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    describe('create', () => {
      it('should create an order', async () => {
        const createData = {
          title: 'Test Order',
          content: 'Test content',
          status: 'pending',
          customId: 1,
          items: [
            {
              productId: 1,
              categoryId: 1,
              quantity: 2,
            },
          ],
        };

        mockedAxios.post.mockResolvedValueOnce({ data: mockOrder });

        const result = await api.orders.create(createData);

        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:3001/orders',
          createData
        );
        expect(result).toEqual(mockOrder);
      });

      it('should handle create order errors', async () => {
        const createData = {
          title: 'Test Order',
          content: 'Test content',
          status: 'pending',
          customId: 1,
          items: [
            {
              productId: 1,
              categoryId: 1,
              quantity: 2,
            },
          ],
        };

        const error = new Error('Network error');
        mockedAxios.post.mockRejectedValueOnce(error);

        await expect(api.orders.create(createData)).rejects.toThrow(error);
        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:3001/orders',
          createData
        );
      });
    });

    describe('getAll', () => {
      it('should get all orders', async () => {
        const orders = [mockOrder];
        mockedAxios.get.mockResolvedValueOnce({ data: orders });

        const result = await api.orders.getAll();

        expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/orders');
        expect(result).toEqual(orders);
      });

      it('should handle get all orders errors', async () => {
        const error = new Error('Network error');
        mockedAxios.get.mockRejectedValueOnce(error);

        await expect(api.orders.getAll()).rejects.toThrow(error);
        expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/orders');
      });
    });

    describe('delete', () => {
      it('should delete an order', async () => {
        const id = 1;
        mockedAxios.delete.mockResolvedValueOnce({ data: undefined });

        await api.orders.delete(id);

        expect(mockedAxios.delete).toHaveBeenCalledWith(`http://localhost:3001/orders/${id}`);
      });

      it('should handle delete order errors', async () => {
        const id = 1;
        const error = new Error('Delete failed');
        mockedAxios.delete.mockRejectedValueOnce(error);

        await expect(api.orders.delete(id)).rejects.toThrow(error);
        expect(mockedAxios.delete).toHaveBeenCalledWith(`http://localhost:3001/orders/${id}`);
      });
    });

    describe('update', () => {
      it('should update an order', async () => {
        const id = 1;
        const updateData = {
          title: 'Updated Order',
          status: 'completed',
        };

        const updatedOrder = { ...mockOrder, ...updateData };
        mockedAxios.patch.mockResolvedValueOnce({ data: updatedOrder });

        const result = await api.orders.update(id, updateData);

        expect(mockedAxios.patch).toHaveBeenCalledWith(
          `http://localhost:3001/orders/${id}`,
          updateData
        );
        expect(result).toEqual(updatedOrder);
      });

      it('should handle update order errors', async () => {
        const id = 1;
        const updateData = {
          title: 'Updated Order',
          status: 'completed',
        };

        const error = new Error('Update failed');
        mockedAxios.patch.mockRejectedValueOnce(error);

        await expect(api.orders.update(id, updateData)).rejects.toThrow(error);
        expect(mockedAxios.patch).toHaveBeenCalledWith(
          `http://localhost:3001/orders/${id}`,
          updateData
        );
      });
    });
  });

  describe('Users API', () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      orders: [],
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    describe('create', () => {
      it('should create a user', async () => {
        const createData = {
          email: 'test@example.com',
          name: 'Test User',
        };

        mockedAxios.post.mockResolvedValueOnce({ data: mockUser });

        const result = await api.users.create(createData);

        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:3001/users',
          createData
        );
        expect(result).toEqual(mockUser);
      });

      it('should handle create user errors', async () => {
        const createData = {
          email: 'test@example.com',
          name: 'Test User',
        };

        const error = new Error('Network error');
        mockedAxios.post.mockRejectedValueOnce(error);

        await expect(api.users.create(createData)).rejects.toThrow(error);
        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:3001/users',
          createData
        );
      });
    });

    describe('getAll', () => {
      it('should get all users', async () => {
        const users = [mockUser];
        mockedAxios.get.mockResolvedValueOnce({ data: users });

        const result = await api.users.getAll();

        expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/users');
        expect(result).toEqual(users);
      });

      it('should handle get all users errors', async () => {
        const error = new Error('Network error');
        mockedAxios.get.mockRejectedValueOnce(error);

        await expect(api.users.getAll()).rejects.toThrow(error);
        expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/users');
      });
    });

    describe('delete', () => {
      it('should delete a user', async () => {
        const id = 1;
        mockedAxios.delete.mockResolvedValueOnce({ data: undefined });

        await api.users.delete(id);

        expect(mockedAxios.delete).toHaveBeenCalledWith(`http://localhost:3001/users/${id}`);
      });

      it('should handle delete user errors', async () => {
        const id = 1;
        const error = new Error('Delete failed');
        mockedAxios.delete.mockRejectedValueOnce(error);

        await expect(api.users.delete(id)).rejects.toThrow(error);
        expect(mockedAxios.delete).toHaveBeenCalledWith(`http://localhost:3001/users/${id}`);
      });
    });

    describe('update', () => {
      it('should update a user', async () => {
        const id = 1;
        const updateData = {
          email: 'updated@example.com',
          name: 'Updated User',
        };

        mockedAxios.patch.mockResolvedValueOnce({ data: undefined });

        await api.users.update(id, updateData);

        expect(mockedAxios.patch).toHaveBeenCalledWith(
          `http://localhost:3001/users/${id}`,
          updateData
        );
      });

      it('should handle update user errors', async () => {
        const id = 1;
        const updateData = {
          email: 'updated@example.com',
          name: 'Updated User',
        };

        const error = new Error('Update failed');
        mockedAxios.patch.mockRejectedValueOnce(error);

        await expect(api.users.update(id, updateData)).rejects.toThrow(error);
        expect(mockedAxios.patch).toHaveBeenCalledWith(
          `http://localhost:3001/users/${id}`,
          updateData
        );
      });
    });
  });
});
