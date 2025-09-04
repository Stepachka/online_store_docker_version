import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        categories: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            title: string;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
        cost: number;
        img: string;
    }>;
    findAll(): Promise<({
        orderItems: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            quantity: number;
            categoryId: number;
            productId: number;
            orderId: number;
        }[];
        categories: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            title: string;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
        cost: number;
        img: string;
    })[]>;
    findOne(id: string): Promise<{
        orderItems: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            quantity: number;
            categoryId: number;
            productId: number;
            orderId: number;
        }[];
        categories: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            title: string;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
        cost: number;
        img: string;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        categories: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            title: string;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
        cost: number;
        img: string;
    }>;
    remove(id: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        title: string;
        cost: number;
        img: string;
    }>;
}
