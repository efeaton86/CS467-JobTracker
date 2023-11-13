import React, {useState} from 'react';
import 'bulma/css/bulma.min.css';

function ContactForm({onAddContact}) {

    const initialFormData = {
        first_name: '',
        last_name: '',
        mobile_phone: '',
        work_phone: '',
        email: '',
        linkedin: '',
        employer: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddContact(formData);
        setFormData(initialFormData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">First Name: </label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Last Name: </label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>

            </div>
            <div className="field">
               <label className="label">Mobile Phone: </label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="mobile_phone"
                        value={formData.mobile_phone}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="field">
               <label className="label">Work Phone: </label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="work_phone"
                        value={formData.work_phone}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="field">
               <label className="label">Email: </label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="field">
               <label className="label">Linkedin: </label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="field">
               <label className="label">Employer:  </label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="employer"
                        value={formData.employer}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button className="button is-medium" type="submit">Add Contact</button>
        </form>
    );
}

export default ContactForm;
