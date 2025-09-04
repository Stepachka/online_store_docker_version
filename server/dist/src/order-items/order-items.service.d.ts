import { PrismaService } from '../prisma/prisma.service';
export declare class OrderItemsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        category: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            title: string;
        };
        product: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            title: string;
            cost: number;
            img: string;
        };
        order: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            title: string;
            content: string | null;
            status: string;
            customId: number | null;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        quantity: number;
        categoryId: number;
        productId: number;
        orderId: number;
    })[]>;
    findOne(id: number): Promise<{
        category: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            title: string;
        };
        product: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            title: string;
            cost: number;
            img: string;
        };
        order: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            title: string;
            content: string | null;
            status: string;
            customId: number | null;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        quantity: number;
        categoryId: number;
        productId: number;
        orderId: number;
    }>;
    remove(id: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        quantity: number;
        categoryId: number;
        productId: number;
        orderId: number;
    }>;
}
