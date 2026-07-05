import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { connectMongoDB } from './connectMongoDB.js';
import { User } from '../models/user.js';
import { Story } from '../models/story.js';

const SEED_USER = {
    email: 'seed@pryrodni-mandry.com',
    password: 'seed-password'
};

const stories = [
    {
        image: 'https://ac.goit.global/fullstack/react/nature-1.jpg',
        header: 'Стежками Карпатського біосферного заповідника',
        category: 'routes',
        mainText: 'Маршрут веде через букові праліси, гірські полонини та мальовничі водоспади, відкриваючи неповторні краєвиди Карпат.'
    },
    {
        image: 'https://ac.goit.global/fullstack/react/nature-2.jpg',
        header: '10 порад для екологічного туризму',
        category: 'eco-tips',
        mainText: 'Як подорожувати, не завдаючи шкоди природі: сортування сміття, вибір маршрутів та підтримка місцевих громад.'
    },
    {
        image: 'https://ac.goit.global/fullstack/react/nature-3.jpg',
        header: 'Дивовижний світ Шацьких озер',
        category: 'nature',
        mainText: 'Шацький національний природний парк вражає розмаїттям флори і фауни та кришталево чистими озерами.'
    },
    {
        image: 'https://ac.goit.global/fullstack/react/nature-4.jpg',
        header: 'Традиції гуцульських майстрів',
        category: 'culture',
        mainText: 'Знайомство з давніми ремеслами гуцулів: різьбою по дереву, гончарством та ткацтвом.'
    },
    {
        image: 'https://ac.goit.global/fullstack/react/nature-5.jpg',
        header: 'Смак Карпат: місцеві сири та мед',
        category: 'local-products',
        mainText: 'Огляд автентичних продуктів гірських господарств, які варто скуштувати під час подорожі.'
    }
];

const seed = async () => {
    await connectMongoDB();

    try {
        let seedUser = await User.findOne({ email: SEED_USER.email });
        if (!seedUser) {
            const hashedPassword = await bcrypt.hash(SEED_USER.password, 10);
            seedUser = await User.create({ ...SEED_USER, password: hashedPassword });
        }
        await Story.insertMany(
            stories.map((story) => ({ ...story, userId: seedUser._id }))
        );

        console.log(`Seeded ${stories.length} stories for user ${seedUser.email}`);
    } catch (error) {
        console.error('Failed to seed database:', error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

seed();