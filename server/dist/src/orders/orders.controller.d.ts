import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<{
        custom: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string | null;
            email: string;
        } | null;
        items: ({
            category: {
                title: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
            product: {
                title: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                cost: number;
                img: string;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            quantity: number;
            categoryId: number;
            productId: number;
            orderId: number;
        })[];
    } & {
        title: string;
        content: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        customId: number | null;
    }>;
    findAll(): Promise<({
        custom: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string | null;
            email: string;
        } | null;
        items: ({
            category: {
                title: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
            product: {
                title: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                cost: number;
                img: string;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            quantity: number;
            categoryId: number;
            productId: number;
            orderId: number;
        })[];
    } & {
        title: string;
        content: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        customId: number | null;
    })[]>;
    findOne(id: number): Promise<{
        custom: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string | null;
            email: string;
        } | null;
        items: ({
            category: {
                title: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
            product: {
                title: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                cost: number;
                img: string;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            quantity: number;
            categoryId: number;
            productId: number;
            orderId: number;
        })[];
    } & {
        title: string;
        content: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        customId: number | null;
    }>;
    remove(id: number): Promise<{
        title: string;
        content: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        customId: number | null;
    }>;
    update(id: number, createOrderDto: UpdateOrderDto): Promise<{
        title: string;
        content: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        customId: number | null;
    }>;
}
