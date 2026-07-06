import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { connectMongoDB } from './connectMongoDB.js';
import { User } from '../models/user.js';
import { Story } from '../models/story.js';
import { Category } from '../models/category.js';

const SEED_USER = {
    name: 'Seed User',
    email: 'seed@pryrodni-mandry.com',
    password: 'seed-password'
};

const categories = [
    {
        category: 'routes',
        title: 'Маршрути',
        img: 'https://ac.goit.global/fullstack/react/nature-1.jpg',
        description: 'Пішохідні та велосипедні маршрути мальовничими куточками України.'
    },
    {
        category: 'eco-tips',
        title: 'Еко-поради',
        img: 'https://ac.goit.global/fullstack/react/nature-2.jpg',
        description: 'Поради, як подорожувати, не завдаючи шкоди довкіллю.'
    },
    {
        category: 'nature',
        title: 'Природа',
        img: 'https://ac.goit.global/fullstack/react/nature-3.jpg',
        description: 'Природні заповідники, парки та унікальні екосистеми.'
    },
    {
        category: 'culture',
        title: 'Культура',
        img: 'https://ac.goit.global/fullstack/react/nature-4.jpg',
        description: 'Традиції, ремесла та звичаї місцевих громад.'
    },
    {
        category: 'local-products',
        title: 'Локальні продукти',
        img: 'https://ac.goit.global/fullstack/react/nature-5.jpg',
        description: 'Автентичні продукти та страви від місцевих виробників.'
    }
];

const stories = [
    {
        img: 'https://ac.goit.global/fullstack/react/nature-1.jpg',
        title: 'Стежками Карпатського біосферного заповідника',
        category: 'routes',
        article: 'Маршрут веде через букові праліси, гірські полонини та мальовничі водоспади, відкриваючи неповторні краєвиди Карпат.',
        rate: 5
    },
    {
        img: 'https://ac.goit.global/fullstack/react/nature-2.jpg',
        title: '10 порад для екологічного туризму',
        category: 'eco-tips',
        article: 'Як подорожувати, не завдаючи шкоди природі: сортування сміття, вибір маршрутів та підтримка місцевих громад.',
        rate: 5
    },
    {
        img: 'https://ac.goit.global/fullstack/react/nature-3.jpg',
        title: 'Дивовижний світ Шацьких озер',
        category: 'nature',
        article: 'Шацький національний природний парк вражає розмаїттям флори і фауни та кришталево чистими озерами.',
        rate: 9
    },
    {
        img: 'https://ac.goit.global/fullstack/react/nature-4.jpg',
        title: 'Традиції гуцульських майстрів',
        category: 'culture',
        article: 'Знайомство з давніми ремеслами гуцулів: різьбою по дереву, гончарством та ткацтвом.',
        rate: 6
    },
    {
        img: 'https://ac.goit.global/fullstack/react/nature-5.jpg',
        title: 'Смак Карпат: місцеві сири та мед',
        category: 'local-products',
        article: 'Огляд автентичних продуктів гірських господарств, які варто скуштувати під час подорожі.',
        rate: 7
    }
];

const seed = async () => {
    await connectMongoDB();

    try {
        await Promise.all([
            User.deleteMany({}),
            Story.deleteMany({}),
            Category.deleteMany({})
        ]);

        const hashedPassword = await bcrypt.hash(SEED_USER.password, 10);
        const seedUser = await User.create({ ...SEED_USER, password: hashedPassword });

        await Category.insertMany(categories);

        await Story.insertMany(
            stories.map((story) => ({ ...story, ownerId: seedUser._id }))
        );

        console.log(`Seeded ${categories.length} categories and ${stories.length} stories for user ${seedUser.email}`);
    } catch (error) {
        console.error('Failed to seed database:', error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

seed();