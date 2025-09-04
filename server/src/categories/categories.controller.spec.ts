import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockCategory = {
    id: 1,
    title: 'Test Category',
    products: [],
    orderItems: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCategoriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        title: 'Test Category',
      };

      mockCategoriesService.create.mockResolvedValue(mockCategory);

      const result = await controller.create(createCategoryDto);

      expect(service.create).toHaveBeenCalledWith(createCategoryDto);
      expect(result).toEqual(mockCategory);
    });

    it('should handle service errors during creation', async () => {
      const createCategoryDto: CreateCategoryDto = {
        title: 'Test Category',
      };

      const error = new Error('Service error');
      mockCategoriesService.create.mockRejectedValue(error);

      await expect(controller.create(createCategoryDto)).rejects.toThrow(error);
      expect(service.create).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories = [mockCategory];
      mockCategoriesService.findAll.mockResolvedValue(categories);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(categories);
    });

    it('should handle service errors during findAll', async () => {
      const error = new Error('Service error');
      mockCategoriesService.findAll.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow(error);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      const id = '1';
      mockCategoriesService.findOne.mockResolvedValue(mockCategory);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCategory);
    });

    it('should handle service errors during findOne', async () => {
      const id = '1';
      const error = new Error('Category not found');
      mockCategoriesService.findOne.mockRejectedValue(error);

      await expect(controller.findOne(id)).rejects.toThrow(error);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const id = 1;
      const updateCategoryDto: UpdateCategoryDto = {
        title: 'Updated Category',
      };

      const updatedCategory = { ...mockCategory, ...updateCategoryDto };
      mockCategoriesService.update.mockResolvedValue(updatedCategory);

      const result = await controller.update(id, updateCategoryDto);

      expect(service.update).toHaveBeenCalledWith(1, updateCategoryDto);
      expect(result).toEqual(updatedCategory);
    });

    it('should handle service errors during update', async () => {
      const id = 1;
      const updateCategoryDto: UpdateCategoryDto = {
        title: 'Updated Category',
      };

      const error = new Error('Update failed');
      mockCategoriesService.update.mockRejectedValue(error);

      await expect(controller.update(id, updateCategoryDto)).rejects.toThrow(error);
      expect(service.update).toHaveBeenCalledWith(1, updateCategoryDto);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      const id = '1';
      mockCategoriesService.remove.mockResolvedValue(mockCategory);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCategory);
    });

    it('should handle service errors during remove', async () => {
      const id = '1';
      const error = new Error('Delete failed');
      mockCategoriesService.remove.mockRejectedValue(error);

      await expect(controller.remove(id)).rejects.toThrow(error);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
