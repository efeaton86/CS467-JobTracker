import React, { useState } from 'react';


function SkillForm({onAddSkill, onCancel}) {

    const initialFormData = {
        skill_name: '',
        proficiency: '',
        companies: '' // TODO: Use an array to store selected companies
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onAddSkill(formData);
        setFormData(initialFormData);
    };


    return (
        <div className="add-skill">
            <h2 className="title">Add Skill</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="skill">Skill:</label>
                <input
                    type="text"
                    id="skill_name"
                    name="skill_name"
                    value={formData.skill_name}
                    onChange={handleChange}
                    placeholder= "Enter a skill (e.g., JavaScript)"
                    required
                /><br /><br />

                <label htmlFor="proficiency">Proficiency:</label>
                <select
                    id="proficiency"
                    name="proficiency"
                    value={formData.proficiency}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select Proficiency</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                </select><br /><br />

                <label htmlFor="companies">Companies:</label>
                <select
                    id="companies"
                    name="companies"
                    value={formData.companies}
                    onChange={handleChange}
                    placeholder="Select Company"
                    //multiple // Enable multiple selections of companies
                    required
                // Change later to companies from Job Forms
                >
                    <option value="" disabled>Select Company</option>
                    <option value="Company A">Company A</option>
                    <option value="Company B">Company B</option>
                    <option value="Company C">Company C</option>
                    <option value="Company D">Company D</option>
                </select><br /><br />

                <div className="button-container">
                    <input type="submit" value="Submit" />
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>

            </form>
        </div>
    );


}

export default SkillForm;
