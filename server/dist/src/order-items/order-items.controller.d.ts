import { OrderItemsService } from './order-items.service';
export declare class OrderItemsController {
    private readonly orderItemsService;
    constructor(orderItemsService: OrderItemsService);
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
    findOne(id: string): Promise<{
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
    remove(id: string): Promise<{
        id: number;
        categoryId: number;
        productId: number;
        orderId: number;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
