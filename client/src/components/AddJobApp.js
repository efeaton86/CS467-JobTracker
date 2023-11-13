import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Stack from 'react-bootstrap/Stack';
import axios from "axios";

function AddJobApp() {
	const navigate = useNavigate();
	// const {user} = useAuthContext();
	const [application, setApplication] = useState({
		company: "",
		position: "",
		skills: "",
		status: "",
		date_applied: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	


	const handleChange = (event) => {
		const {name, value} = event.target;

		setApplication(prev => {
			return({
				...prev,
				[name]: value,
			})
		})
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(application);

		setFormErrors(validate(application));
		setIsSubmit(true);		
	};



	 useEffect(() => {
	 	const addJob = async () => {
	 		if (!application.date_applied) {
	 			application.date_applied = "---";
	 		}

			
	 		const res = axios.post("/api/applications/", application, {
//	 			headers: {
//	 				'Authorization': `Bearer ${user.token}`
//	 			}
	 		})
	 		.then((res) => console.log(res))
	 		.catch((err) => console.log(err));
	 	}
	  
	 	if (Object.keys(formErrors).length === 0 && isSubmit) {
			
	 		addJob()
	 		navigate("/applications");
	 	}
	 }, [formErrors]);


	
	const validate = (values) => {
	
		const errors = {};

		if(!values.company) {
			errors.company = "Company is required";
		}
		if(!values.position) {
			errors.position = "Position is required";
		}
		if(!values.status) {
			errors.status = "Status is required";
		}
		if(!values.skills) {
			errors.skills = "Skills is required";
		}
		// if(!values.date_applied) {
		// 	errors.date_applied = "Date Applied is required";
		// }

		return errors;
	};

	


	return(
		<div className="add-job">
			<h1 className="title">Add Job Application</h1>
			<Form>
				<Form.Group>
					<FloatingLabel
						controlId="floatingInput"
						label="Company"
						className="mb-3"
					>
						<Form.Control 
							name="company"
							value={application.company}
							placeholder="Company" 
							onChange={handleChange}
							required
						/>
						<p className="error">{ formErrors.company }</p>
					</FloatingLabel>
					<FloatingLabel
						controlId="floatingInput"
						label="Position"
						className="mb-3"
					>
						<Form.Control 
							name="position" 
							value={application.position}
							placeholder="Position" 
							onChange={handleChange}
							required
						/>
						<p className="error">{ formErrors.position }</p>
					</FloatingLabel>
					<FloatingLabel
						controlId="floatingInput"
						label="Skills"
						className="mb-3"
					>
						<Form.Select
							name="skills"
							value={application.skills}
							onChange={handleChange}
							required
						>	
							<option label="Select a skill"></option>
							<option value="skill1">Skill1</option>
							<option value="skill2">Skill2</option>
						</Form.Select>
						<p className="error">{ formErrors.skills }</p>
					</FloatingLabel>
					<FloatingLabel
						controlId="floatingInput"
						label="Status"
						className="mb-3"
					>
						<Form.Select
							name="status" 
							value={application.status}
							onChange={handleChange}
							required
						>	
							<option label="Select a status"></option>
							<option value="Prospect">Prospect</option>
							<option value="Applied">Applied</option>
							<option value="Phone Screen">Phone Screen</option>
							<option value="Online Assessment">Online Assessment</option>
							<option value="Interview: Phone">Interview: Phone</option>
							<option value="Interview: Virtual">Interview: Virtual</option>
							<option value="Interview: In-office">Interview: In-office</option>
							<option value="Negotiating Offer">Negotiating Offer</option>
							<option value="Rejection">Rejection</option>
							<option value="Closed">Closed</option>
							<option value="Offer">Offer</option>
						</Form.Select>
						<p className="error">{ formErrors.status }</p>
					</FloatingLabel>
					<FloatingLabel
						controlId="floatingInput"
						label="Date Applied (optional)"
						className="mb-3"
					>
						<Form.Control 
							type="date"
							name="date_applied" 
							value={application.date_applied}
							onChange={handleChange}
							required
							/>
					</FloatingLabel>
				</Form.Group>

			</Form>
			<Stack direction="horizontal" className="modal-btns" gap={2}>
				<Button variant="outline-secondary" className="cancel-btn" onClickCapture={() => navigate(-1)}>Cancel</Button>
				<Button type="submit" variant="primary" size="lg" className="glow-on-hover add-btn" onClick={handleSubmit}>Add Job Application</Button>
			</Stack>
			
		</div>
	)
}

export default AddJobApp;