import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemsController } from './order-items.controller';
import { OrderItemsService } from './order-items.service';

describe('OrderItemsController', () => {
  let controller: OrderItemsController;
  let service: OrderItemsService;

  const mockOrderItem = {
    id: 1,
    categoryId: 1,
    productId: 1,
    orderId: 1,
    quantity: 2,
    category: {
      id: 1,
      title: 'Test Category',
      products: [],
      orderItems: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    product: {
      id: 1,
      title: 'Test Product',
      cost: 100,
      img: 'test-image.jpg',
      categories: [],
      orderItems: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    order: {
      id: 1,
      title: 'Test Order',
      content: 'Test content',
      status: 'pending',
      customId: 1,
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockOrderItemsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemsController],
      providers: [
        {
          provide: OrderItemsService,
          useValue: mockOrderItemsService,
        },
      ],
    }).compile();

    controller = module.get<OrderItemsController>(OrderItemsController);
    service = module.get<OrderItemsService>(OrderItemsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of order items', async () => {
      const orderItems = [mockOrderItem];
      mockOrderItemsService.findAll.mockResolvedValue(orderItems);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(orderItems);
    });

    it('should handle service errors during findAll', async () => {
      const error = new Error('Service error');
      mockOrderItemsService.findAll.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow(error);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an order item by id', async () => {
      const id = '1';
      mockOrderItemsService.findOne.mockResolvedValue(mockOrderItem);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockOrderItem);
    });

    it('should handle service errors during findOne', async () => {
      const id = '1';
      const error = new Error('Order item not found');
      mockOrderItemsService.findOne.mockRejectedValue(error);

      await expect(controller.findOne(id)).rejects.toThrow(error);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('remove', () => {
    it('should remove an order item', async () => {
      const id = '1';
      mockOrderItemsService.remove.mockResolvedValue(mockOrderItem);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockOrderItem);
    });

    it('should handle service errors during remove', async () => {
      const id = '1';
      const error = new Error('Delete failed');
      mockOrderItemsService.remove.mockRejectedValue(error);

      await expect(controller.remove(id)).rejects.toThrow(error);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
