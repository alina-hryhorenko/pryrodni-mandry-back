import { User } from '../models/user.js';

export const getUsers = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [users, totalItems] = await Promise.all([
      User.find().select('-password').skip(skip).limit(limit),
      User.countDocuments(),
    ]);

    res.status(200).json({
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const getPopularUsers = async (req, res) => {
  const popularUsersQuery = User.find();

  popularUsersQuery.where('articlesAmount').gt(0);

  const popularUsers = await popularUsersQuery
    .sort({ articlesAmount: -1 })
    .limit(12);

  res.status(200).json({ popularUsers });
};
