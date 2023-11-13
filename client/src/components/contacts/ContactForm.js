import React, {useState} from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";

function ContactForm({onAddContact, isOpen, openModal, closeModal}) {

    const initialFormData = {
        first_name: '',
        last_name: '',
        mobile_phone: '',
        work_phone: '',
        email: '',
        linkedin: '',
        employer: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => {
            return ({
                ...prev,
                [name]: value,
            })
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddContact(formData);
        setFormData(initialFormData);
    };

    return (
        <Modal show={isOpen} className="update-modal">
            <Modal.Header closeButton onClick={closeModal}>
                <Modal.Title>Add Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mobile Phone:</Form.Label>
                        <Form.Control
                            type="text"
                            name="mobile_phone"
                            value={formData.mobile_phone}
                            onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Work Phone:</Form.Label>
                        <Form.Control
                            type="text"
                            name="work_phone"
                            value={formData.work_phone}
                            onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Linkedin:</Form.Label>
                        <Form.Control
                            type="text"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Employer:</Form.Label>
                        <Form.Control
                            type="text"
                            name="employer"
                            value={formData.employer}
                            onChange={handleChange}/>
                    </Form.Group>
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

export default ContactForm;
