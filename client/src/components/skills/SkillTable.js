import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style.css'
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

function SkillTable({skills, onUpdateSkill, onDeleteSkill}) {

  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Company List Drop Down // 
  const [companyOptions, setCompanyOptions] = useState([]);

  // Filter Feature //
  const [showFilters, setShowFilters] = useState(false); // New state for controlling filter visibility
  const [skillFilter, setSkillFilter] = useState('');
  const [proficiencyFilter, setProficiencyFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');

  skills.filter((skill) => {
    const skillNameMatches = skillFilter === '' || skill.skill_name.toLowerCase().includes(skillFilter.toLowerCase());
    const proficiencyMatches = proficiencyFilter === '' || skill.proficiency === proficiencyFilter;
    const companyMatches = companyFilter === '' || skill.companies === companyFilter;

    return skillNameMatches && proficiencyMatches && companyMatches;
  });

  // Fetch Company List for dropdown // 
  useEffect(() => {
    const fetchCompanyNames = async () => {
      try {
        const response = await axios.get('/api/applications/companies');
        const companies = response.data;
        setCompanyOptions(companies);
      } catch (error) {
        console.error('Error fetching company names:', error);
      }
    };

    fetchCompanyNames();
  }, []);


  // Function to clear filters
  const handleClearFilters = () => {
    setSkillFilter('');
    setProficiencyFilter('');
    setCompanyFilter('');
  };
  
  const handleToggleFilters = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters);
  };


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
        console.error('Error updating skill.');
      }
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  // Check if there are no skills
  if (skills.length === 0) {
    return (
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Skill</th>
              <th>Proficiency</th>
              <th>Companies</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <br></br>
          </tbody>
        </table>
      </div>
    );
  }


return (
  <div>
    {/* Filter Inputs */}
    {showFilters && (
  <div className="filter-section">
    <input
      className="filter-input"
      type="text"
      placeholder="Filter by Skill"
      value={skillFilter}
      onChange={(e) => setSkillFilter(e.target.value)}
    />

    <select
      className="filter-input"
      value={proficiencyFilter}
      onChange={(e) => setProficiencyFilter(e.target.value)}
    >
      <option value="">Filter by Proficiency</option>
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option>
      <option value="Expert">Expert</option>
    </select>

    <select
      className="filter-input"
      value={companyFilter}
      onChange={(e) => setCompanyFilter(e.target.value)}
    >
      <option value="">Filter by Company</option>
      {companyOptions.map((companyObj) => (
        <option key={companyObj.company} value={companyObj.company}>
          {companyObj.company}
        </option>
      ))}
    </select>

    <button className="rounded-button clear-filters-button" onClick={handleClearFilters}>
      Clear
    </button>
  </div>
)}

    {/* Skill Table */}
    <table className="table">
      <thead>
        <tr>
          <th>Skill</th>
          <th>Proficiency</th>
          <th>Companies</th>
          <th> {/* Button to toggle filter visibility */}
              <button className="rounded-button" onClick={handleToggleFilters}>
                {showFilters ? 'Hide Filter' : 'Filter Results'}
              </button> 
          </th>
        </tr>
      </thead>
      <tbody>
        {/* Use skills.filter to apply filters */}
        {skills
          .filter((skill) =>
            skill.skill_name.toLowerCase().includes(skillFilter.toLowerCase())
          )
          .filter(
            (skill) =>
              proficiencyFilter === '' || skill.proficiency === proficiencyFilter
          )
          .filter(
            (skill) =>
              companyFilter === '' || skill.companies === companyFilter
          )
          .map((skill) => (
            <tr key={skill._id}>
              <td>
                {editRowId === skill._id ? (
                  <input
                    type="text"
                    value={editedData.skill_name}
                    onChange={(e) =>
                      setEditedData({ ...editedData, skill_name: e.target.value })
                    }
                  />
                ) : (
                  skill.skill_name
                )}
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
                      <option value="" disabled>Select Company</option>
                      {companyOptions.map((companyObj) => (
                        <option key={companyObj.company} value={companyObj.company}>
                          {companyObj.company}
                        </option>
                      ))}
                  </select>
                ) : (
                  skill.companies
                )}
              </td>
              <td>
                {editRowId === skill._id ? (
                  <button
                    className="small-button"
                    onClick={() => handleUpdateClick(skill._id, editedData)}
                  >
                    Update
                  </button>
                ) : (
                  <>
                    <button
                      className="small-button"
                      onClick={() => handleEditClick(skill._id)}
                    >
                    <MdOutlineEdit />

                    </button>
                    {editRowId !== skill._id && (
                      <button
                        className="small-button"
                        onClick={() => handleDeleteClick(skill._id)}
                      >
                      <FaRegTrashCan />
                      </button>
                    )}
                  </>
                )}
                {editRowId === skill._id && (
                  <button className="small-button" onClick={handleCancelClick}>
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>

    {/* Delete Confirmation Pop-up */}
    {deleteConfirmation !== null && (
      <>
        <div className="overlay active"></div>
        <div className="confirmation active">
          <p>Are you sure you want to delete this skill?</p>
          <div className="button-container">
            <button className="rounded-button" onClick={handleConfirmDelete}>
              Yes
            </button>
            <button className="rounded-button" onClick={handleCancelDelete}>
              No
            </button>
          </div>
        </div>
      </>
    )}
  </div>
);

}
export default SkillTable;