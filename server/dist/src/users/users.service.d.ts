import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(): Promise<({
        orders: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            title: string;
            content: string | null;
            status: string;
            customId: number | null;
        }[];
    } & {
        email: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    })[]>;
    findOne(id: number): Promise<{
        orders: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            title: string;
            content: string | null;
            status: string;
            customId: number | null;
        }[];
    } & {
        email: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        email: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
