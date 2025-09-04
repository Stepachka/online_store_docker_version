import { OrderItemsService } from './order-items.service';
export declare class OrderItemsController {
    private readonly orderItemsService;
    constructor(orderItemsService: OrderItemsService);
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
    findOne(id: string): Promise<{
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
    remove(id: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        quantity: number;
        categoryId: number;
        productId: number;
        orderId: number;
    }>;
}
