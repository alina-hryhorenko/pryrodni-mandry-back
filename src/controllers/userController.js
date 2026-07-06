import { User } from '../models/user.js';

export const getPopularUsers = async (req, res) => {
  const popularUsersQuery = User.find();

  popularUsersQuery.where('articlesAmount').gt(0);

  const popularUsers = await popularUsersQuery
    .sort({ articlesAmount: -1 })
    .limit(12);

  res.status(200).json({ popularUsers });
};
