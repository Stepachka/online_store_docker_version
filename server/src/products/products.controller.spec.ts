import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProduct = {
    id: 1,
    title: 'Test Product',
    cost: 100,
    img: 'test-image.jpg',
    categories: [],
    orderItems: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockProductsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        title: 'Test Product',
        cost: 100,
        img: 'test-image.jpg',
        categoryIds: [1, 2],
      };

      mockProductsService.create.mockResolvedValue(mockProduct);

      const result = await controller.create(createProductDto);

      expect(service.create).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(mockProduct);
    });

    it('should handle service errors during creation', async () => {
      const createProductDto: CreateProductDto = {
        title: 'Test Product',
        cost: 100,
        img: 'test-image.jpg',
        categoryIds: [1, 2],
      };

      const error = new Error('Service error');
      mockProductsService.create.mockRejectedValue(error);

      await expect(controller.create(createProductDto)).rejects.toThrow(error);
      expect(service.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [mockProduct];
      mockProductsService.findAll.mockResolvedValue(products);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(products);
    });

    it('should handle service errors during findAll', async () => {
      const error = new Error('Service error');
      mockProductsService.findAll.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow(error);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const id = '1';
      mockProductsService.findOne.mockResolvedValue(mockProduct);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProduct);
    });

    it('should handle service errors during findOne', async () => {
      const id = '1';
      const error = new Error('Product not found');
      mockProductsService.findOne.mockRejectedValue(error);

      await expect(controller.findOne(id)).rejects.toThrow(error);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const id = '1';
      const updateProductDto: UpdateProductDto = {
        title: 'Updated Product',
        cost: 150,
      };

      const updatedProduct = { ...mockProduct, ...updateProductDto };
      mockProductsService.update.mockResolvedValue(updatedProduct);

      const result = await controller.update(id, updateProductDto);

      expect(service.update).toHaveBeenCalledWith(1, updateProductDto);
      expect(result).toEqual(updatedProduct);
    });

    it('should handle service errors during update', async () => {
      const id = '1';
      const updateProductDto: UpdateProductDto = {
        title: 'Updated Product',
      };

      const error = new Error('Update failed');
      mockProductsService.update.mockRejectedValue(error);

      await expect(controller.update(id, updateProductDto)).rejects.toThrow(error);
      expect(service.update).toHaveBeenCalledWith(1, updateProductDto);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const id = '1';
      mockProductsService.remove.mockResolvedValue(mockProduct);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProduct);
    });

    it('should handle service errors during remove', async () => {
      const id = '1';
      const error = new Error('Delete failed');
      mockProductsService.remove.mockRejectedValue(error);

      await expect(controller.remove(id)).rejects.toThrow(error);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
