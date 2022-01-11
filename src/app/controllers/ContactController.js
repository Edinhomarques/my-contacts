const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const contacts = await ContactsRepository.findAll();
    response.json(contacts);
  }

  show() {
    // Obter um registro
  }

  store() {
    // Criar um novo registro
  }

  update() {
    // Editar um registro
  }

  delete() {
    // Deletar um registro
  }
}

// Por que exportar com new? -> Design pattern Singleton
// Basicamente só deixa ter uma instância dos objeto nessa aplicação
// Por que? - Ter mais controlle sobre o acesso a propriedades e métodos de uma classe
module.exports = new ContactController();
