import React from 'react';

import "../../styles/Applications.css";
import {Button} from "react-bootstrap";

function ContactTableRow({contact, handleDeleteClick}) {
    return (
        <>
            <tr key={contact._id}>
                <td>
                    {contact.first_name}
                </td>
                <td>
                    {contact.last_name}
                </td>
                <td>
                    {contact.mobile_phone}
                </td>
                <td>
                    {contact.work_phone}
                </td>
                <td>
                    {contact.email}
                </td>
                <td>
                    {contact.linkedin}
                </td>
                <td>
                    {contact.employer}
                </td>
                <td>
                    <Button variant="primary" size="sm" className="btn btn-primary btn-add" onClick={() => handleDeleteClick(contact._id)}>Delete</Button>
                </td>
            </tr>
        </>
    );
}

export default ContactTableRow;
