import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        categories: {
            title: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        }[];
    } & {
        cost: number;
        title: string;
        img: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(): Promise<({
        categories: {
            title: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
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
        cost: number;
        title: string;
        img: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    })[]>;
    findOne(id: number): Promise<{
        categories: {
            title: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
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
        cost: number;
        title: string;
        img: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        categories: {
            title: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        }[];
    } & {
        cost: number;
        title: string;
        img: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        cost: number;
        title: string;
        img: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
