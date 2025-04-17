// Example validation middleware
const validateQuestion = (req, res, next) => {
    const { title, description, tags } = req.body;
    if (!title || !description || !tags) {
      return res.status(400).json({ error: 'Title, description, and tags are required' });
    }
    next();
  };
  
  module.exports = { validateQuestion };
  