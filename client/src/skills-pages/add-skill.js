import React, { useState } from 'react';


function AddSkill() {
    const [formData, setFormData] = useState({
        skill: '',
        proficiency: '',
        companies: '' // Use an array to store selected companies
    });

    const handleChange = (e) => {
            setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }));
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(JSON.stringify(formData))
            const response = await fetch('/api/skills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="add-skill">
            <h1 className="title">Add Skill</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="skill">Skill:</label>
                <input
                    type="text"
                    id="skill"
                    name="skill"
                    value={formData.skill}
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
                    placeholder="Select One"
                    required
                >
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
                    <option value="Company A">Company A</option>
                    <option value="Company B">Company B</option>
                    <option value="Company C">Company C</option>
                    <option value="Company D">Company D</option>
                </select><br /><br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );


}

export default AddSkill;
