import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
// import './Contacts.css'
import "../../styles/Applications.css";
import Table from "react-bootstrap/Table";
import ContactTableRow from "./ContactTableRow";
import ContactUpdateForm from "./ContactUpdateForm";
function ContactTable({contacts, onUpdateContact, onDeleteContact}) {

  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleEditClick = (rowId) => {
    setEditRowId(rowId);
  };

  const handleCancelClick = () => {
    setEditRowId(null);
  };

  const handleDeleteClick = (rowId) => {
    onDeleteContact(rowId)
  }

 const handleUpdateClick = async (rowId) => {
  try {
    const response = await fetch(`/api/contacts/${rowId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    });
    if (response.ok) {
      onUpdateContact(rowId, editedData);
      setEditRowId(null);
      setEditedData({})
    } else {
      // TODO: refactor this to display fields with an error
      console.error('Error updating contact.');
    }
  } catch (error) {
    console.error('Error updating contact:', error);
  }
};

  return (
    <>
      <ContactUpdateForm isOpen={isModalOpen} onUpdateContact={handleUpdateClick}/>
      <Table className="jobTable">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Phone</th>
            <th>Work Phone</th>
            <th>Email</th>
            <th>LinkedIn</th>
            <th>Employer</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
              ContactTableRow({
                contact,
                editedData,
                editRowId,
                setEditedData,
                handleEditClick,
                handleCancelClick,
                handleDeleteClick,
                handleUpdateClick,
                openModal,
                closeModal})
          ))}
        </tbody>
      </Table>
      </>
  );
}

export default ContactTable;
