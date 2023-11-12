import { Button, FloatingLabel, Form, Spinner, Row, Col, Container } from 'react-bootstrap'
import { useEffect, useState }  from "react";
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import "../styles/Applications.css";

import { format } from 'date-fns'

function JobAppTable() {
	const navigate = useNavigate();
	const [applications, setApplications] = useState([]);
	const [updatedJob, setUpdatedJob] = useState({});
	const [loading, setLoading] = useState(false);
	const [isFiltered, setFilter] = useState(false);
	const [filteredJobsArray, setFilteredJobs] = useState([])

	// Update Modal variables
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		const fetchJobs = async () => {
			setLoading(true)
			const res = await axios.get("/api/applications/", {
			// Refactor when Authorization is finalized
//				headers: {
//					'Authorization': `Bearer ${user.token}`
//				}
			})
			.then((res) => {
				console.log(res.data)
				setApplications(res.data);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false)
			})
		}
        fetchJobs()
//		if (user) {
//			fetchJobs()
//		}

	}, [])
	//, [user])


	const deleteJob = (id) => {
		axios.delete(`/api/applications/${id}`, {})
            .then(res => console.log(res))
            .catch(err => console.log(err))

		window.location.reload();         // Reload page after delete
	};

	const updateJob = (application) => {
		setUpdatedJob(application);
		handleShow();
	};

	const handleChange = (e) => {
		const {name, value} = e.target;

			setUpdatedJob(prev => {
				return({
					...prev,
					[name]: value,
				});
			});
	};

	const saveUpdatedJob = () => {

		// Send new data to server
		axios.put(`/api/applications/${updatedJob._id}`, updatedJob, {
		})
		.then(res => console.log(res))
		.catch(err => console.log(err));

			// Close modal
			handleClose();
			window.location.reload();
	};



	let table_data = applications.map((application, index) => {
	    console.log(application._id);
		return (
			<tr data-index={index} key={application._id}>
				<td>{application.company}</td>

				<td>{application.position}</td>
                <td>{application.skills}</td>
				<td>{application.status}</td>
				{application.date_applied === "---" ? (
						<>
							<td>--- </td>
						</>
						) : (
							 <>
                                  <td>{application.date_applied}</td>
                             </>

				)}

				<td className="action-col">
					<a onClick={() => updateJob(application)} size="sm" className="action-links">
					    Edit
					</a>
					<a onClick={() => deleteJob(application._id)} size="sm" className="action-links" >
					    Delete
					</a>
				</td>
			</tr>
		);
	})

	return (
	<>
    	<Button variant="primary" size="lg" className="btn btn-primary" onClick = {() => navigate("add-job")}>
			Add Job Application
		</Button> 
		<div className="jobAppTable">			
			<Modal className="update-modal"  show={show} onHide={handleClose}>
				<Modal.Header closeButton>
				<Modal.Title>Update Job</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<Form>
					<Form.Group>
					<FloatingLabel
						controlId="floatingInput"
						label="Company"
						className="mb-3"
					>
						<Form.Control
						name="company"
						value={updatedJob.company ? updatedJob.company : ""}
						placeholder="Company"
						onChange={handleChange}
						required
						/>
					</FloatingLabel>
					<FloatingLabel
						controlId="floatingInput"
						label="Position"
						className="mb-3"
					>
						<Form.Control
						name="position"
						value={updatedJob.position ? updatedJob.position : ""}
						placeholder="Position"
						onChange={handleChange}
						required
						/>
					</FloatingLabel>
					<FloatingLabel
						controlId="floatingInput"
						label="Skills"
						className="mb-3"
					>
						<Form.Select
						name="Skills"
						value={updatedJob.skills ? updatedJob.skills : ""}
						onChange={handleChange}
						required
						>
						<option label="Select skills"></option>
						<option value="skill1">skill1</option>
						<option value="skill2">skill2</option>


						</Form.Select>
					</FloatingLabel>
					<FloatingLabel
						controlId="floatingInput"
						label="Status"
						className="mb-3"
					>
						<Form.Select
						name="status"
						value={updatedJob.status ? updatedJob.status : ""}
						onChange={handleChange}
						required
						>
						<option label="Select a stage"></option>
						<option value="Prospect">Prospect</option>
						<option value="Applied">Applied</option>
						<option value="Phone Screen">Phone Screen</option>
						<option value="Online Assessment">Online Assessment</option>
						<option value="Interview: Phone">Interview: Phone</option>
						<option value="Interview: Video">Interview: Virtual</option>
						<option value="Interview: In-office">Interview: In-office</option>
						<option value="Negotiating Offer">Negotiating Offer</option>
						<option value="Rejection">Rejection</option>
						<option value="Closed">Closed</option>
						<option value="Offer">Offer</option>
						</Form.Select>
					</FloatingLabel>
					<FloatingLabel
						controlId="floatingInput"
						label="Date Applied"
						className="mb-3"
					>
						<Form.Control
						type="date"
						name="date_applied"
						value={updatedJob.date_applied ? updatedJob.date_applied : ""}
						required
						/>
					</FloatingLabel>

					</Form.Group>
				</Form>

				</Modal.Body>
				<Modal.Footer>
				<Stack direction="horizontal" gap={3}>
					<Button variant="outline-secondary" className="cancel-btn">
					Cancel
					</Button>
					<Button size="lg" variant="primary" className="update-btn glow-on-hover" onClick={saveUpdatedJob}>
					Save
					</Button>
				</Stack>
				</Modal.Footer>
			</Modal>
			
			<Table className="jobTable" responsive >
					<thead>
						<tr>
							<th>Company</th>
							<th>Position</th>
							<th>Skills</th>
							<th>Status</th>
							<th>Date Applied</th>
							<th></th>
						</tr>
					</thead>
                    { applications.length ? (
						<>
							<tbody>{table_data}</tbody>
						</>
					) : (
						<tbody>
							<tr className="no-data"><td>No jobs right now. Start applying!</td></tr>
						</tbody>

					)}
			</Table>

		</div>
	</>
)}


export default JobAppTable;