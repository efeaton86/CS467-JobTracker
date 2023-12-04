import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './Style.css'


function SkillForm({onAddSkill, onCancel, onSubmit}) {

    const initialFormData = {
        skill_name: '',
        proficiency: '',
        companies: '' 
    };

    const [companyOptions, setCompanyOptions] = useState([]); // State to store company options
    const [formData, setFormData] = useState(initialFormData);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);


    const fetchCompanyNames = async () => {
        try {
          const response = await axios.get('/api/applications/companies');
          const companies = response.data;
          setCompanyOptions(companies);
        } catch (error) {
          console.error('Error fetching company names:', error);
        }
      };

    useEffect(() => {
        fetchCompanyNames();
      }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await onAddSkill(formData);
          setFormData(initialFormData);
          setShowSuccessMessage(true);
          
          // Delay execution of onSubmit(closeModal) after 1.5 seconds
          setTimeout(() => {
            setShowSuccessMessage(false);
            onSubmit(); // Call onSubmit after the success message has disappeared
          }, 1500);
          
        } catch (error) {
          console.error('Error adding skill:', error);
        }
      };
      

    return (
        <div className="skill-form">
            <h2 className="title">Add Skill</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                <label htmlFor="skill"></label>
                <input
                    type="text"
                    id="skill_name"
                    name="skill_name"
                    value={formData.skill_name}
                    onChange={handleChange}
                    placeholder= "Enter a skill (e.g., JavaScript)"
                    required
                /><br /><br />
                </div>

                <div className="form-floating mb-3">
                <label htmlFor="proficiency"></label>
                <select
                    id="proficiency"
                    name="proficiency"
                    value={formData.proficiency}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select Your Proficiency Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                </select><br /><br />
                </div>
                
                <div className="form-floating mb-3">
                <label htmlFor="companies"></label>
                <select
                    id="companies"
                    name="companies"
                    value={formData.companies}
                    onChange={handleChange}
                    placeholder="Select Company"
                >   {/* Pull companies listed from applications database */} 
                    <option value="" disabled>Select Associated Company</option>
                    {/* Map over companyOptions to generate <option> elements */}
                    {companyOptions && companyOptions.map((companyObj) => (
                    <option key={companyObj.company} value={companyObj.company}>
                        {companyObj.company}
                    </option>
                    ))}
                </select><br /><br />
                </div>


                <div className="add-skill-btns">
                    <button className="cancel" type="button" onClick={onCancel}>Cancel</button>
                    <input className="submit" type="submit" value="Submit" />
                </div>

                {/* Success Message */}
                {showSuccessMessage && (
                    <div className="overlay active">
                        <div className="confirmation active">
                            <p>Skill added successfully!</p>
                        </div>
                 </div>
                )}

        </form>
    </div>
);
}

export default SkillForm;
