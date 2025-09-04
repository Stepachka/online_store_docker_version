declare class OrderItemDto {
    productId: number;
    categoryId: number;
    quantity: number;
}
export declare class CreateOrderDto {
    title: string;
    content?: string;
    status: string;
    customId?: number;
    items: OrderItemDto[];
}
export {};
