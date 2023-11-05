import React, {useEffect, useState} from 'react';
import ContactTable from '../components/contacts/ContactTable';
import ContactForm from "../components/contacts/ContactForm";

function Contacts() {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('/api/contacts/')
            .then((response) => response.json())
            .then((data) => {
                    setContacts(data)
                }
            )
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

    const addContact = (newContactData) => {
        fetch('/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newContactData),
        })
            .then((response) => response.json())
            .then((createdContact) => {
                setContacts([...contacts, createdContact]);
            })
            .catch((error) => console.error('Error adding contact:', error));
    };

    return (
        <div>
            <ContactTable
                contacts={contacts}
                onUpdateContact={updateContact}/>
            <ContactForm onAddContact={addContact}/>
        </div>
    );
}

export default Contacts;
