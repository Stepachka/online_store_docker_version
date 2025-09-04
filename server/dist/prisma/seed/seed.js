"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    const user1 = await prisma.user.create({
        data: {
            email: 'user1@example.com',
            name: 'Иван Иванов',
        },
    });
    const user2 = await prisma.user.create({
        data: {
            email: 'user2@example.com',
            name: 'Петр Петров',
        },
    });
    const category1 = await prisma.category.create({
        data: {
            title: 'Электроника',
        },
    });
    const category2 = await prisma.category.create({
        data: {
            title: 'Одежда',
        },
    });
    const category3 = await prisma.category.create({
        data: {
            title: 'Книги',
        },
    });
    const product1 = await prisma.product.create({
        data: {
            title: 'Смартфон',
            cost: 29999.99,
            img: 'https://spb.electrogor.ru/img/work/nomencl/smartfon-samsung-galaxy-a16-8-256gb-zelenyi-green-124563.jpg',
            categories: {
                connect: [{ id: category1.id }],
            },
        },
    });
    const product2 = await prisma.product.create({
        data: {
            title: 'Ноутбук',
            cost: 59999.99,
            img: 'https://www.ixbt.com/img/r30/00/02/58/65/IMG3013.jpg',
            categories: {
                connect: [{ id: category1.id }],
            },
        },
    });
    const product3 = await prisma.product.create({
        data: {
            title: 'Футболка',
            img: 'https://xn--1-9sbj3bbge9d.xn--p1ai/pictures/product/big/44505_big.jpg',
            cost: 1999.99,
            categories: {
                connect: [{ id: category2.id }],
            },
        },
    });
    const product4 = await prisma.product.create({
        data: {
            title: 'Книга - Программирование на TypeScript',
            img: 'https://static.insales-cdn.com/images/products/1/1392/401114480/44611725.jpg',
            cost: 1499.99,
            categories: {
                connect: [{ id: category3.id }],
            },
        },
    });
    const order1 = await prisma.order.create({
        data: {
            title: 'Заказ электроники',
            content: 'Нужно доставить до пятницы',
            status: 'pending',
            customId: user1.id,
            items: {
                create: [
                    {
                        categoryId: category1.id,
                        productId: product1.id,
                        quantity: 1,
                    },
                    {
                        categoryId: category1.id,
                        productId: product2.id,
                        quantity: 1,
                    },
                ],
            },
        },
    });
    const order2 = await prisma.order.create({
        data: {
            title: 'Заказ одежды и книг',
            content: 'Срочный заказ',
            status: 'processing',
            customId: user2.id,
            items: {
                create: [
                    {
                        categoryId: category2.id,
                        productId: product3.id,
                        quantity: 2,
                    },
                    {
                        categoryId: category3.id,
                        productId: product4.id,
                        quantity: 3,
                    },
                ],
            },
        },
    });
    console.log('Seed данные созданы:');
    console.log('- Пользователей:', 2);
    console.log('- Категорий:', 3);
    console.log('- Продуктов:', 4);
    console.log('- Заказов:', 2);
    console.log('- Позиций заказов:', 4);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map