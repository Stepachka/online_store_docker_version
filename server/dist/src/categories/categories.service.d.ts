import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): Promise<{
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
    remove(id: number): Promise<{
        title: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, body: UpdateCategoryDto): Promise<{
        title: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
