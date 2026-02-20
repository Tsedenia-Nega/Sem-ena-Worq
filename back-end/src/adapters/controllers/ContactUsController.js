import mongoose from 'mongoose';
import ContactUsEntity from '../../Domain/ContactUsEntity.js';
class ContactController {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }

    async createContact(req, res) {
        try {
            const { firstName, lastName, email, subject, message } = req.body;

            if (!firstName || !lastName || !email || !subject || !message) {
                return res.status(400).json({ message: "All fields are required." });
            }

            // Validate the contact entity
            const contactEntity = new ContactUsEntity({ firstName, lastName, email, subject, message });
            contactEntity.validate();

            // Save contact
            const newMessage = await this.contactRepository.createContactUs({ firstName, lastName, email, subject, message });

            res.status(201).json(newMessage);
        } catch (err) {
            console.error("Error in createContact:", err);
            res.status(400).json({ message: `Error: ${err.message}` });
        }
    }

    async getContacts(req, res) {
        try {
          const {
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            sortingOrder = "desc",
          } = req.query;

          const validatedPage = Math.max(1, parseInt(page));
          const validatedLimit = Math.min(50, Math.max(1, parseInt(limit)));
          const validatedSortingOrder = sortingOrder === "asc" ? 1 : -1;

          // Inside your ContactController.getContacts method:

          // CHANGE THIS:
          // const { contacts, totalItems } = await this.contactRepository.getContactsUs(...)

          // TO THIS (Destructure 'messages' then rename it to 'contacts' for the response):
          const { messages, totalItems } =
            await this.contactRepository.getContactsUs({
              page: validatedPage,
              limit: validatedLimit,
              sortingOrder: validatedSortingOrder,
            });

          // Now 'messages' contains your array, so send it in the JSON:
          res.status(200).json({
            pagination: {
              currentPage: validatedPage,
              totalPages: Math.ceil(totalItems / validatedLimit),
              totalItems,
              limit: validatedLimit,
            },
            data: messages, // Send the messages array here
          });

        //   const totalPages = Math.ceil(totalItems / validatedLimit);

        //   res.status(200).json({
        //     pagination: {
        //       currentPage: validatedPage,
        //       totalPages,
        //       totalItems,
        //       limit: validatedLimit,
        //     },
        //     data: contacts,
        //   });
        } catch (error) {
            console.error('Error in getContacts:', error);
            res.status(500).json({ message: `Error: ${error.message}` });
        }
    }

    async deleteContact(req, res) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid message ID' });
            }

            const objectId = new mongoose.Types.ObjectId(id);
            const deletedMessage = await this.contactRepository.deleteContactUs(objectId);

            if (!deletedMessage) {
                return res.status(404).json({ message: 'Message not found' });
            }

            res.status(200).json({ message: 'Message deleted successfully', deletedMessage });
        } catch (err) {
            console.error('Error in deleteContact:', err);
            res.status(500).json({ message: `Error: ${err.message}` });
        }
    }

    async getContactById(req, res) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid message ID' });
            }

            const objectId = new mongoose.Types.ObjectId(id);
            const contact = await this.contactRepository.getContactById(objectId);

            if (!contact) {
                return res.status(404).json({ message: 'Contact not found' });
            }

            res.status(200).json(contact);
        } catch (err) {
            console.error('Error in getContactById:', err);
            res.status(500).json({ message: `Error: ${err.message}` });
        }
    }
}

export default ContactController;
