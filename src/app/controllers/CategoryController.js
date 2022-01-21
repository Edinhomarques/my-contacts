const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoryRepository.findAll();

    return response.json(categories);
  }

  async store(request, response) {
    const {
      name,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoryRepository.findByName(name);

    if (categoryExists) {
      return response.status(400).json({ error: 'This category name is already in use' });
    }
    // Criar um novo registro
    const category = await CategoryRepository.create({
      name,
    });

    return response.json(category);
  }
}

module.exports = new CategoryController();
