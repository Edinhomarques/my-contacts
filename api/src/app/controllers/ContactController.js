const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    // Obter um registro
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }
    return response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'This e-mail is already is use' });
    }
    // Criar um novo registro
    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    return response.status(201).json(contact);
  }

  async update(request, response) {
    // Editar um registro
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already is use' });
    }
    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });
    return response.json(contact);
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;

    await ContactsRepository.delete(id);
    return response.sendStatus(204);
  }
}

// Por que exportar com new? -> Design pattern Singleton
// Basicamente s?? deixa ter uma inst??ncia dos objeto nessa aplica????o
// Por que? - Ter mais controlle sobre o acesso a propriedades e m??todos de uma classe
module.exports = new ContactController();
