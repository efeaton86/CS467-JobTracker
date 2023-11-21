import React from 'react';
import 'bulma/css/bulma.min.css';

import "../../styles/Applications.css";
import Table from "react-bootstrap/Table";
import ContactTableRow from "./ContactTableRow";

function ContactTable({contacts, onDeleteContact}) {

  const handleDeleteClick = (rowId) => {
    onDeleteContact(rowId)
  }

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
