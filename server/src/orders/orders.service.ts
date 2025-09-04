import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items, ...orderData } = createOrderDto;

    return this.prisma.order.create({
      data: {
        ...orderData,
        items: {
          create: items.map((item) => ({
            quantity: item.quantity,
            product: { connect: { id: item.productId } },
            category: { connect: { id: item.categoryId } },
          })),
        },
      },
      include: {
        custom: true,
        items: {
          include: {
            product: true,
            category: true,
          },
        },
      },
    });
  }

  async updateAdvanced(id: number, createOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: createOrderDto,
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        custom: true,
        items: {
          include: {
            product: true,
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        custom: true,
        items: {
          include: {
            product: true,
            category: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
