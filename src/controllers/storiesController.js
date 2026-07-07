export const getAllStories = (req, res) => {
    const {page=1, limit=10, category} = req.query;

    res.res(200).json();
};

export const getPopularStories = (req, res) => {

    res.res(200).json();
};

export const getStoryByStoryId = (req, res) => {

    res.res(200).json();
};

export const getStoryByUserId = (req, res) => {

    res.res(200).json();
};

// export const getStoryByCategory = (req, res) => {

//     res.res(200).json();
// }

export const createStory = (req, res) => {
    res.res(200).json();
};