import {Story} from "../models/story.js";
export const getStories = async (req, res) => { 
    const { page = 1, limit = 9, category, sort } = req.query;
    const filter = {};
    if (category) {
        filter.category = category;
     };
    const pipeline = [];
    //фільтрація по категоріях
    if (category) {
        pipeline.push({ $match: filter });
    };
//сортування за нові\популярні
    if (sort === "new") {
        pipeline.push({ $sort: { createdAt: -1 } });
    };
    if (sort === "popular") { 
        pipeline.push({ $sort: { likes: -1 } });
    };
    //пагінація
    const skip = (page - 1) * limit;
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: Number(limit) });


    //Підключення populate для отримання даних автора. стаття і інформація про автора
    pipeline.push({
        $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "authorData"
        }
    });
    pipeline.push({ $unwind: "$authorData" });
    //агрегація
    const stories = await Story.aggregate(pipeline);
    //кількість сторінок
    const match = {};

if (category) {
    match.category = category;
    };
    const totalStories = await Story.countDocuments(match);
    const totalPages = Math.ceil(totalStories / limit);
    res.status(200).json({ page, limit, stories, totalPages, totalStories });

};