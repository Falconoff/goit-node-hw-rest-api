const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

// get all
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  if (!contacts) {
    return null;
  }
  return contacts;
};

// get 1 contact
const getContactById = async contactId => {
  const contactsArray = await listContacts();
  const result = contactsArray.find(contact => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

// remove contact
const removeContact = async contactId => {
  const contactsArray = await listContacts();
  const indx = contactsArray.findIndex(contact => contact.id === contactId);
  if (indx === -1) {
    return null;
  }
  const updatedContacts = contactsArray.filter((_, index) => index !== indx);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return contactsArray[indx];
};

// add new contact
const addContact = async body => {
  const contactsArray = await listContacts();
  const newContact = { id: nanoid(4), ...body };
  contactsArray.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArray));
  if (!newContact) {
    return null;
  }
  return newContact;
};

// update contact
const updateContact = async (contactId, body) => {
  const contactsArray = await listContacts();
  const idx = contactsArray.findIndex(item => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contactsArray[idx] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactsArray));
  return contactsArray[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
