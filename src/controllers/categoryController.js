import { getAllCategories, getCategoryBySlug, getArticlesByCategory } from '../models/category.js';

export const getCategories = (req, res) => {
  try {
    const categories = getAllCategories();
    res.json({ success: true, categories });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
};

export const getArticlesForCategory = (req, res) => {
  try {
    const { slug } = req.params;
    const { page = 1, subcategory } = req.query;

    const category = getCategoryBySlug(slug);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const articles = getArticlesByCategory({
      categoryId: category.id,
      subcategoryName: subcategory,
      page: parseInt(page)
    });

    res.json({
      success: true,
      category: category.name,
      articles
    });
  } catch (err) {
    console.error('Error fetching category articles:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch articles' });
  }
};
