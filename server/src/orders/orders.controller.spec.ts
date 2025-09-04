import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  const mockOrder = {
    id: 1,
    title: 'Test Order',
    content: 'Test content',
    status: 'pending',
    customId: 1,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockOrdersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    updateAdvanced: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockOrdersService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an order', async () => {
      const createOrderDto: CreateOrderDto = {
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

      mockOrdersService.create.mockResolvedValue(mockOrder);

      const result = await controller.create(createOrderDto);

      expect(service.create).toHaveBeenCalledWith(createOrderDto);
      expect(result).toEqual(mockOrder);
    });

    it('should handle service errors during creation', async () => {
      const createOrderDto: CreateOrderDto = {
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

      const error = new Error('Service error');
      mockOrdersService.create.mockRejectedValue(error);

      await expect(controller.create(createOrderDto)).rejects.toThrow(error);
      expect(service.create).toHaveBeenCalledWith(createOrderDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const orders = [mockOrder];
      mockOrdersService.findAll.mockResolvedValue(orders);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(orders);
    });

    it('should handle service errors during findAll', async () => {
      const error = new Error('Service error');
      mockOrdersService.findAll.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow(error);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an order by id', async () => {
      const id = 1;
      mockOrdersService.findOne.mockResolvedValue(mockOrder);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockOrder);
    });

    it('should handle service errors during findOne', async () => {
      const id = 1;
      const error = new Error('Order not found');
      mockOrdersService.findOne.mockRejectedValue(error);

      await expect(controller.findOne(id)).rejects.toThrow(error);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an order', async () => {
      const id = 1;
      const updateOrderDto: UpdateOrderDto = {
        title: 'Updated Order',
        status: 'completed',
      };

      const updatedOrder = { ...mockOrder, ...updateOrderDto };
      mockOrdersService.updateAdvanced.mockResolvedValue(updatedOrder);

      const result = await controller.update(id, updateOrderDto);

      expect(service.updateAdvanced).toHaveBeenCalledWith(1, updateOrderDto);
      expect(result).toEqual(updatedOrder);
    });

    it('should handle service errors during update', async () => {
      const id = 1;
      const updateOrderDto: UpdateOrderDto = {
        title: 'Updated Order',
        status: 'completed',
      };

      const error = new Error('Update failed');
      mockOrdersService.updateAdvanced.mockRejectedValue(error);

      await expect(controller.update(id, updateOrderDto)).rejects.toThrow(error);
      expect(service.updateAdvanced).toHaveBeenCalledWith(1, updateOrderDto);
    });
  });

  describe('remove', () => {
    it('should remove an order', async () => {
      const id = 1;
      mockOrdersService.remove.mockResolvedValue(undefined);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });

    it('should handle service errors during remove', async () => {
      const id = 1;
      const error = new Error('Delete failed');
      mockOrdersService.remove.mockRejectedValue(error);

      await expect(controller.remove(id)).rejects.toThrow(error);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
