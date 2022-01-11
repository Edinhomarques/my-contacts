const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Edson Marques',
    email: 'edson@gmail.com',
    phone: '11111111',
    category_id: uuid(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }
}

module.exports = new ContactRepository();
