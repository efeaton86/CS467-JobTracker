import React, { useState } from 'react';
import './Style.css'

function SkillTable({skills, onUpdateSkill, onDeleteSkill}) {

  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);


  const handleEditClick = (rowId) => {
    // Find the skill data to be edited based on rowId
    const skillToEdit = skills.find((skill) => skill._id === rowId);
    // Set the edited data in the state
    setEditedData(skillToEdit);
    setEditRowId(rowId);
  };

  const handleCancelClick = () => {
    setEditRowId(null);
  };

  const handleDeleteClick = (rowId) => {
    // Open the delete confirmation pop-up
    setDeleteConfirmation(rowId);
  };

  const handleConfirmDelete = () => {
    // User confirmed the delete action
    onDeleteSkill(deleteConfirmation);
    setDeleteConfirmation(null); // Close the confirmation pop-up
  };

  const handleCancelDelete = () => {
    // User canceled the delete action
    setDeleteConfirmation(null); // Close the confirmation pop-up
  };

 const handleUpdateClick = async (rowId) => {
  try {
    const response = await fetch(`/api/skills/${rowId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    });
    if (response.ok) {
      onUpdateSkill(rowId, editedData);
      setEditRowId(null);
    } else {
      // TODO: refactor this to display fields with an error
      console.error('Error updating skill.');
    }
  } catch (error) {
    console.error('Error updating skill:', error);
  }
};

  return (
    <div>
      <h1>Skills Page</h1>
      <table>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Proficiency</th>
            <th>Companies</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill._id}>
                <td>
                    {editRowId === skill._id ?
                        <input type="text" value={editedData.skill_name}
                            onChange={
                        (e) => setEditedData({ ...editedData, skill_name: e.target.value })}
                        />
                        : skill.skill_name}
                </td>
                <td>
                    {editRowId === skill._id ? (
                    <select
                        value={editedData.proficiency}
                        onChange={(e) =>
                        setEditedData({ ...editedData, proficiency: e.target.value })
                        }
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                    </select>
                    ) : (
                    skill.proficiency
                    )}
                </td>
                <td>
                    {editRowId === skill._id ? (
                    <select
                        value={editedData.companies}
                        onChange={(e) =>
                        setEditedData({ ...editedData, companies: e.target.value })
                        }
                    >
                        <option value="Company A">Company A</option>
                        <option value="Company B">Company B</option>
                        <option value="Company C">Company C</option>
                        <option value="Company D">Company D</option>
                    </select>
                    ) : (
                    skill.companies
                    )}
                </td>
                <td>
                    {editRowId === skill._id ? (
                        <button onClick={() => handleUpdateClick(skill._id, editedData)}>Update</button>
                    ) : (
                        <>
                        <button onClick={() => handleEditClick(skill._id)}>Edit</button>
                        {editRowId !== skill._id && (
                            <button onClick={() => handleDeleteClick(skill._id)}>Delete</button>
                        )}
                        </>
                    )}
                    {editRowId === skill._id && <button onClick={handleCancelClick}>Cancel</button>}
                </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Pop-up */}
      {deleteConfirmation !== null && (
        <>
            <div className="overlay"></div>
            <div className="delete-confirmation">
                <p>Are you sure you want to delete this skill?</p>
                <button onClick={handleConfirmDelete}>Yes</button>
                <button onClick={handleCancelDelete}>No</button>
            </div>
        </>
      )}

    </div>
  );
}

export default SkillTable;