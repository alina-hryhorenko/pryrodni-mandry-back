export const getHealth = (req, res) => {
  res.status(200).json({
    status: 200,
    timestamp: new Date().toISOString(),
  });
};
