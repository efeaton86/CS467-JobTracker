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

    return (
        <div>
            <ContactTable contacts={contacts} onUpdateContact={updateContact}/>
            <ContactForm onAddContact={addContact}/>
        </div>
    );
}

export default Contacts;
