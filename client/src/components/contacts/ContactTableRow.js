import React, {useState} from 'react';
import ContactUpdateForm from "./ContactUpdateForm";
import 'bulma/css/bulma.min.css';

import "../../styles/Applications.css";
import {Button} from "react-bootstrap";

function ContactTableRow({contact, editedData, editRowId, setEditedData, handleEditClick, handleCancelClick, handleDeleteClick, handleUpdateClick}) {
    const rowStyle = {
        width: "150px"
  /* You can add other styles as needed */
}
    return (
        <>
            <tr  key={contact._id}>
                <td>
                    {editRowId === contact._id ?
                        <input style={rowStyle} type="text" placeholder={contact.first_name} value={editedData.first_name}
                               onChange={
                                   (e) => setEditedData({...editedData, first_name: e.target.value})}
                        />
                        : contact.first_name}
                </td>
                <td>
                    {editRowId === contact._id ?
                        <input style={rowStyle} type="text" placeholder={contact.last_name} value={editedData.last_name}
                               onChange={
                                   (e) => setEditedData({...editedData, last_name: e.target.value})}
                        />
                        : contact.last_name}
                </td>
                <td>
                    {editRowId === contact._id ?
                        <input style={rowStyle} type="text" placeholder={contact.mobile_phone} value={editedData.mobile_phone}
                               onChange={
                                   (e) => setEditedData({...editedData, mobile_phone: e.target.value})}
                        />
                        : contact.mobile_phone}
                </td>
                <td>
                    {editRowId === contact._id ?
                        <input style={rowStyle} type="text" placeholder={contact.work_phone} value={editedData.work_phone}
                               onChange={
                                   (e) => setEditedData({...editedData, work_phone: e.target.value})}
                        />
                        : contact.work_phone}
                </td>
                <td>
                    {editRowId === contact._id ?
                        <input style={rowStyle} type="text" placeholder={contact.email} value={editedData.email}
                               onChange={
                                   (e) => setEditedData({...editedData, email: e.target.value})}
                        />
                        : contact.email}
                </td>
                <td>
                    {editRowId === contact._id ?
                        <input style={rowStyle} type="text" placeholder={contact.linkedin} value={editedData.linkedin}
                               onChange={
                                   (e) => setEditedData({...editedData, linkedin: e.target.value})}
                        />
                        : contact.linkedin}
                </td>
                <td>
                    {editRowId === contact._id ?
                        <input style={rowStyle} type="text" placeholder={contact.employer} value={editedData.employer}
                               onChange={
                                   (e) => setEditedData({...editedData, employer: e.target.value})}
                        />
                        : contact.employer}
                </td>

                <td>
                    {editRowId === contact._id ?
                        (
                            <Button variant="primary" size="sm" className="btn btn-primary btn-add"
                                    onClick={() => handleUpdateClick(contact._id, editedData)}> Update </Button>

                        ) : (
                            <>
                            <Button variant="primary" size="sm" className="btn btn-primary btn-add"
                                onClick={() => handleEditClick(contact._id)}> Edit
                            </Button>
                            <Button variant="primary" size="sm" className="btn btn-primary btn-add" onClick={() => handleDeleteClick(contact._id)}>Delete</Button>
                            </>
                        )}
                    {editRowId === contact._id && (
                        <Button variant="primary" size="sm" className="btn btn-primary btn-add"  onClick={handleCancelClick}>Cancel</Button>
                    )}
                </td>
            </tr>
        </>
    );
}

export default ContactTableRow;
