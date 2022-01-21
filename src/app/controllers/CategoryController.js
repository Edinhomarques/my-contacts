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

  async update(request, response) {
    const { id } = request.params;
    const {
      name,
    } = request.body;

    const categoryExists = await CategoryRepository.findById(id);

    if (!categoryExists) {
      return response.status(404).json({ error: 'Category not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categoryByName = await CategoryRepository.findByName(name);

    if (categoryByName && categoryByName.id !== id) {
      return response.status(400).json({ error: 'This name is already in use' });
    }
    const category = await CategoryRepository.update(id, {
      name,
    });
    return response.json(category);
  }
}

module.exports = new CategoryController();
