import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    findOne(id: string): Promise<{
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
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: string): Promise<{
        email: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
