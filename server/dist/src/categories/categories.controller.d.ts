import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        title: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(): Promise<({
        products: {
            title: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            cost: number;
            img: string;
        }[];
        orderItems: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            categoryId: number;
            productId: number;
            orderId: number;
            quantity: number;
        }[];
    } & {
        title: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    })[]>;
    findOne(id: string): Promise<{
        products: {
            title: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            cost: number;
            img: string;
        }[];
        orderItems: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            categoryId: number;
            productId: number;
            orderId: number;
            quantity: number;
        }[];
    } & {
        title: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        title: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: string): Promise<{
        title: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
