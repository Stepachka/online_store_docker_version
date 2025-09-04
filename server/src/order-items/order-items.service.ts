import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderItemsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.orderItem.findMany({
      include: {
        product: true,
        category: true,
        order: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id },
      include: {
        product: true,
        category: true,
        order: true,
      },
    });

    if (!orderItem) {
      throw new NotFoundException(`OrderItem with ID ${id} not found`);
    }

    return orderItem;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.orderItem.delete({
      where: { id },
    });
  }
}
