import { PrismaService } from '../prisma/prisma.service';
export declare class OrderItemsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        category: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
        };
        product: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            cost: number;
            img: string;
        };
        order: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            content: string | null;
            status: string;
            customId: number | null;
        };
    } & {
        id: number;
        categoryId: number;
        productId: number;
        orderId: number;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: number): Promise<{
        category: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
        };
        product: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            cost: number;
            img: string;
        };
        order: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            content: string | null;
            status: string;
            customId: number | null;
        };
    } & {
        id: number;
        categoryId: number;
        productId: number;
        orderId: number;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        categoryId: number;
        productId: number;
        orderId: number;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
