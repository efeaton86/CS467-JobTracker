import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";

function ContactUpdateForm({contacts, onUpdateContact, isOpen, closeModal}) {

    const initialFormData = {
        _id: '',
        first_name: '',
        last_name: '',
        mobile_phone: '',
        work_phone: '',
        email: '',
        linkedin: '',
        employer: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [updatedData, setUpdatedData] = useState(initialFormData);
    const [selectedContactId, setSelectedContactId] = useState(null)

    const handleContactIDChange = (e) => {
        const id = e.target.value
        const selectedContact = contacts.find((contact) => contact._id === id);

        setSelectedContactId(id);
        setUpdatedData(selectedContact);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUpdatedData(prev => {
            return ({
                ...prev,
                [name]: value,
            })
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // update server side data
        handleUpdateClick(selectedContactId)
        // update client side data
        onUpdateContact(updatedData._id, updatedData);

        setFormData(initialFormData);
        closeModal()
    };

    const handleUpdateClick = async (rowId) => {
        try {
            const response = await fetch(`/api/contacts/${rowId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            if (response.ok) {
                setSelectedContactId(null);

            } else {
                // TODO: refactor this to display fields with an error
                console.error('Error updating contact.');
            }
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    return (
        <Modal show={isOpen} className="update-modal">
            <Modal.Header closeButton onClick={closeModal}>
                <Modal.Title>Edit Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Form.Group>
                            <Form.Label htmlFor="_id">Select Contact to Edit:</Form.Label>
                            <Form.Select name="_id" value={selectedContactId} onChange={handleContactIDChange}>
                                <option value="">Select a Contact</option>
                                {contacts.length > 0 && contacts?.map((contact) => (
                                    <option key={contact._id}
                                            value={contact._id}>{contact.first_name + " " + contact.last_name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="first_name"
                                    value={updatedData.first_name}
                                    onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Mobile Phone:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="mobile_phone"
                                    value={updatedData.mobile_phone}
                                    onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={updatedData.email}
                                    onChange={handleChange}/>
                            </Form.Group>

                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="last_name"
                                    value={updatedData.last_name}
                                    onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Work Phone:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="work_phone"
                                    value={updatedData.work_phone}
                                    onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Linkedin:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="linkedin"
                                    value={updatedData.linkedin}
                                    onChange={handleChange}/>
                            </Form.Group>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Employer:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="employer"
                                    value={updatedData.employer}
                                    onChange={handleChange}/>
                            </Form.Group>
                        </Col>
                    </Row>


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Stack direction="horizontal" gap={3}>
                    <Button variant="outline-secondary" className="cancel-btn" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} type="submit" size="lg" variant="primary"
                            className="update-btn glow-on-hover">
                        Save
                    </Button>
                </Stack>
            </Modal.Footer>
        </Modal>
    );
}

export default ContactUpdateForm;
