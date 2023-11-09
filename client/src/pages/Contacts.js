import React, {useEffect, useState} from 'react';
import ContactTable from '../components/contacts/ContactTable';
import ContactForm from "../components/contacts/ContactForm";

function Contacts() {

    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch('/api/contacts/')
            .then((response) => response.json())
            .then((data) => {setContacts(data)})
            .catch((error) => console.error('Error fetching contacts:', error));
    }, []);

    const updateContact = (rowId, updatedData) => {
        const updatedContacts = contacts.map((contact) => {
            if (contact._id === rowId) {
                return {...contact, ...updatedData};
            }
            return contact;
        });
        setContacts(updatedContacts);
    };

    const deleteContact = (rowId) => {
        fetch(`/api/contacts/${rowId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    setContacts(contacts.filter((contact) => contact._id !== rowId));;
                } else {
                    console.error('Error deleting contact');
                }
            })
            .catch((error) => console.error('Error deleting contact:', error));
    }

    const addContact = async (newContactData) => {
        try {
            const response = await fetch('/api/contacts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContactData),
            })
            if (response.ok) {
                const createdContact = await response.json();
                setContacts([...contacts, createdContact]);
            } else {
                console.error('Error updating contact.');
            }
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <ContactTable contacts={contacts} onUpdateContact={updateContact} onDeleteContact={deleteContact} />
            <button onClick={openModal}>Add Contact</button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <ContactForm onAddContact={addContact} />
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Contacts;
