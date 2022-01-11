const { v4 } = require('uuid');

const contacts = [
  {
    id: v4(),
    name: 'Edson Marques',
    email: 'edson@gmail.com',
    phone: '11111111',
    category_id: v4(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }
}

module.exports = new ContactRepository();
