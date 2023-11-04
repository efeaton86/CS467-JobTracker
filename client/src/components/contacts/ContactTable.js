import React, { useState, useEffect } from 'react';

function ContactTable() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('/api/contacts/')
      .then((response) => response.json()) 
      .then((data) => {setContacts(data)}
      ) 
      .catch((error) => console.error('Error fetching contacts:', error));
  }, []);

  return (
    <div>
      <h1>Contact List</h1>
      <table>
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
            <tr key={contact._id}>
              <td>{contact.first_name}</td>
              <td>{contact.last_name}</td>
              <td>{contact.mobile_phone}</td>
              <td>{contact.work_phone}</td>
              <td>{contact.email}</td>
              <td>{contact.linkedin}</td>
              <td>{contact.employer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactTable;
