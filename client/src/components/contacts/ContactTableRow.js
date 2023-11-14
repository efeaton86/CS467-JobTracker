import React, {useState} from 'react';
import 'bulma/css/bulma.min.css';

import "../../styles/Applications.css";

function ContactTableRow({contact, editedData, editRowId, setEditedData, handleEditClick, handleCancelClick, handleDeleteClick, handleUpdateClick}) {

    return (
        <>
            <tr key={contact._id}>
                <td>
                    {editRowId === contact._id ?
                        <input type="text" value={editedData.first_name}
                               onChange={
                                   (e) => setEditedData({...editedData, first_name: e.target.value})}
                        />
                        : contact.first_name}
                </td>
                <td>
                    {editRowId === contact._id ?
                        <input type="text" value={editedData.last_name}
                               onChange={
                                   (e) => setEditedData({...editedData, last_name: e.target.value})}
                        />
                        : contact.last_name}
                </td>
                <td>
                    {editRowId === contact._id ?
                        <input type="text" value={editedData.mobile_phone}
                               onChange={
                                   (e) => setEditedData({...editedData, mobile_phone: e.target.value})}
                        />
                        : contact.mobile_phone}
                </td>
                <td>
                    {editRowId === contact._id ?
                        <input type="text" value={editedData.work_phone}
                               onChange={
                                   (e) => setEditedData({...editedData, work_phone: e.target.value})}
                        />
                        : contact.work_phone}
                </td>
                <td>
                    {editRowId === contact._id ?
                        <input type="text" value={editedData.email}
                               onChange={
                                   (e) => setEditedData({...editedData, email: e.target.value})}
                        />
                        : contact.email}
                </td>
                <td>
                    {editRowId === contact._id ?
                        <input type="text" value={editedData.linkedin}
                               onChange={
                                   (e) => setEditedData({...editedData, linkedin: e.target.value})}
                        />
                        : contact.linkedin}
                </td>
                <td>
                    {editRowId === contact._id ?
                        <input type="text" value={editedData.employer}
                               onChange={
                                   (e) => setEditedData({...editedData, employer: e.target.value})}
                        />
                        : contact.employer}
                </td>
                <td>
                    {editRowId === contact._id ?
                        (
                            <button className="button is-small"
                                    onClick={() => handleUpdateClick(contact._id, editedData)}> Update </button>
                        ) : (
                            <button className="button is-small"
                                    onClick={() => handleEditClick(contact._id)}> Edit </button>
                        )}
                    <button className="button is-small" onClick={() => handleDeleteClick(contact._id)}>Delete</button>
                    {editRowId === contact._id && (
                        <button className="button is-small" onClick={handleCancelClick}>Cancel</button>
                    )}
                </td>
            </tr>
        </>
    );
}

export default ContactTableRow;
