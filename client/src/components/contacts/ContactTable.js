import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';

import "../../styles/Applications.css";
import Table from "react-bootstrap/Table";
import ContactTableRow from "./ContactTableRow";

function ContactTable({contacts, onUpdateContact, onDeleteContact}) {

  // const [editRowId, setEditRowId] = useState(null);
  // const [editedData, setEditedData] = useState({});
  // const [isModalOpen, setModalOpen] = useState(false);

  // const openModal = () => {
  //   setModalOpen(true);
  // };

  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  // const handleEditClick = (rowId) => {
  //   setEditRowId(rowId);
  // };
  //
  // const handleCancelClick = () => {
  //   setEditRowId(null);
  // };

  const handleDeleteClick = (rowId) => {
    onDeleteContact(rowId)
  }

//  const handleUpdateClick = async (rowId) => {
//   try {
//     const response = await fetch(`/api/contacts/${rowId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(editedData),
//     });
//     if (response.ok) {
//       onUpdateContact(rowId, editedData);
//       setEditRowId(null);
//       setEditedData({})
//     } else {
//       // TODO: refactor this to display fields with an error
//       console.error('Error updating contact.');
//     }
//   } catch (error) {
//     console.error('Error updating contact:', error);
//   }
// };

  return (
    <>
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
                handleDeleteClick,
              })
          ))}
        </tbody>
      </Table>
      </>
  );
}

export default ContactTable;
