import React, { useState } from 'react';

function ContactForm({ onAddContact }) {
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddContact(formData);
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
      </div>
      <div>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
      </div>
      <div>
        <input
          type="text"
          name="mobile_phone"
          value={formData.mobile_phone}
          onChange={handleChange}
          placeholder="Mobile Phone"
        />
      </div>
      <div>
        <input
          type="text"
          name="work_phone"
          value={formData.work_phone}
          onChange={handleChange}
          placeholder="Work Phone"
        />
      </div>
      <div>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
      </div>
      <div>
        <input
          type="text"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn"
        />
      </div>
      <div>
        <input
          type="text"
          name="employer"
          value={formData.employer}
          onChange={handleChange}
          placeholder="Employer"
        />
      </div>
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
