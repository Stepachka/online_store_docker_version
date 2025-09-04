import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<{
        custom: {
            email: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        } | null;
        items: ({
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
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
        content: string | null;
        status: string;
        customId: number | null;
    }>;
    findAll(): Promise<({
        custom: {
            email: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        } | null;
        items: ({
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
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
        content: string | null;
        status: string;
        customId: number | null;
    })[]>;
    findOne(id: number): Promise<{
        custom: {
            email: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        } | null;
        items: ({
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
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
        content: string | null;
        status: string;
        customId: number | null;
    }>;
    remove(id: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
        content: string | null;
        status: string;
        customId: number | null;
    }>;
    update(id: number, createOrderDto: UpdateOrderDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
        content: string | null;
        status: string;
        customId: number | null;
    }>;
}
