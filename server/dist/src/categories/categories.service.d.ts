import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
    }>;
    findAll(): Promise<({
        products: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            title: string;
            cost: number;
            img: string;
        }[];
        orderItems: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            quantity: number;
            categoryId: number;
            productId: number;
            orderId: number;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
    })[]>;
    findOne(id: number): Promise<{
        products: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            title: string;
            cost: number;
            img: string;
        }[];
        orderItems: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            quantity: number;
            categoryId: number;
            productId: number;
            orderId: number;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
    }>;
    remove(id: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
    }>;
    update(id: number, body: UpdateCategoryDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
    }>;
}
