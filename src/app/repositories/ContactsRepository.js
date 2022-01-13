const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Edson Marques',
    email: 'edson@gmail.com',
    phone: '11111111',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Rafaela Marques',
    email: 'rafaela@gmail.com',
    phone: '11111111',
    category_id: v4(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) => resolve(contacts.find((contact) => contact.id === id)));
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(contacts.find((contact) => contact.email === email)));
  }

  create(contact) {
    contact.id = v4();

    return new Promise((resolve) => {
      contacts.push(contact);
      resolve(contact);
    });
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };
      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactRepository();
