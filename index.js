const contactsServise = require("./contacts");
const { program } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsServise.listContacts();
      return console.table(allContacts);
    case "get":
      const contact = await contactsServise.getContactById(id);
      return console.log(contact);

    case "remove":
      const removeContact = await contactsServise.removeContact(id);
      return console.log(removeContact);
    case "add":
      const newContact = await contactsServise.addContact({
        name,
        email,
        phone,
      });
      return console.log(newContact);
    case "update":
      const updateContact = await contactsServise.updateContact(id, {
        name,
        email,
        phone,
      });
      return console.log(updateContact);

    default:
      console.warn("Unknown action!");
  }
};
program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();
const argv = program.opts();
invokeAction(argv);
