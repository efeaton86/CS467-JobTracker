import React, {useEffect, useState} from 'react';
import ContactTable from '../components/contacts/ContactTable';
import ContactForm from "../components/contacts/ContactForm";
import {Button, Col, Row} from "react-bootstrap";

function Contacts() {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
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
                closeModal()
            } else {
                console.error('Error updating contact.');
            }
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };


    return (
        <div className="Applications">
            <div className="jobAppContainer">
                <div>
                    <Row>
                        <Col md={8}><h1><strong>Contacts</strong></h1></Col>
                        <Col md={4}>
                            <Button variant="primary" size="lg" className="btn btn-primary btn-add" onClick={openModal}>
                                Add Contact
                            </Button>
                        </Col>
                    </Row>
                    <ContactTable contacts={contacts} onUpdateContact={updateContact} onDeleteContact={deleteContact} />
                    <ContactForm onAddContact={addContact} isOpen={isModalOpen} closeModal={closeModal} />

                </div>
            </div>
        </div>
    );
}

export default Contacts;
