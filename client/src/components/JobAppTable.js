import { Button, FloatingLabel, Form, Spinner, Row, Col, Container } from 'react-bootstrap'
import { useEffect, useState }  from "react";
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import FilterJobs from './FilterJobs.js'
import BadgeStatus from './BadgeStatus';
import "../styles/Applications.css";
import { format } from 'date-fns'

function JobAppTable() {
	const navigate = useNavigate();
	const [applications, setApplications] = useState([]);
	const [updatedJob, setUpdatedJob] = useState({});
	const [loading, setLoading] = useState(false);
	const [isFiltered, setFilter] = useState(false);
	const [filteredJobsArray, setFilteredJobs] = useState([])
	const [skillsData, setSkillsData] = useState([]);

	// Update Modal variables
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		const fetchJobs = async () => {
			setLoading(true)
			const res = await axios.get("/api/applications/", {
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
	}, [])

    useEffect(() => {
        // Fetch skills data when the component mounts
        const fetchSkills = async () => {
          try {
            const res = await axios.get("/api/skills/"); // Replace with your actual API endpoint for skills
            const skills = res.data;
            setSkillsData(skills);
          } catch (error) {
            console.error("Error fetching skills:", error);
          }
        };

        fetchSkills();
      }, []); // Empty dependency array ensures that this effect runs only once on mount

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

    const onFilterValuesSelected = (filterValue) => {

		if (filterValue !== 'All') {
			saveFilteredJobs(filterValue)
			setFilter(true)
		}
		else {
			setFilteredJobs(applications)
		}

		console.log(isFiltered)
	}

	const saveFilteredJobs = (filterValue) => {
		let jobsArray = []

		applications.forEach(function(job) {

			if (filterValue === 'Prospect' && job.status === 'Prospect') {

				jobsArray.push(job)
			}
			else if (filterValue === 'Applied' && job.status === 'Applied') {
				jobsArray.push(job)
			}
			else if (filterValue === 'Phone Screen' && job.status === 'Phone Screen') {
				jobsArray.push(job)
			}
			else if (filterValue === 'Online Assessment' && job.status === 'Online Assessment') {
				jobsArray.push(job)
			}
			else if (filterValue === 'Phone Screen' && job.status === 'Phone Screen') {
				jobsArray.push(job)
			}
			else if (filterValue === 'Interview: Phone' && job.status === 'Interview: Phone') {
				jobsArray.push(job)
			}
			else if (filterValue === 'Interview: Virtual' && job.status === 'Interview: Virtual') {
				jobsArray.push(job)
			}
			else if (filterValue === 'Interview: In-office' && job.status === 'Interview: In-office') {
				jobsArray.push(job)
			}
			else if (filterValue === 'Negotiating Offer' && job.status === 'Negotiating Offer') {
				jobsArray.push(job)
			}
			else if (filterValue === 'Rejection' && job.status === 'Rejection') {
				jobsArray.push(job)
			}
			else if (filterValue === 'Closed' && job.status === 'Closed') {
				jobsArray.push(job)
			}
			else if (filterValue === 'Offer' && job.status === 'Offer') {
				jobsArray.push(job)
			}

		});

		setFilteredJobs(jobsArray)

	}

	let filtered_table_data = filteredJobsArray.map((filteredJob, index) => {
		console.log(filteredJobsArray)
		return (
			<tr data-index={index} key={filteredJob._id}>
				<td>{filteredJob.company}</td>
				<td>{filteredJob.position}</td>
				<td>{filteredJob.skills}</td>
				<td><BadgeStatus statusSelected={filteredJob.status} /></td>
				{filteredJob.date_applied === "---" ? (
						<>
							<td>--- </td>
						</>
						) : (
							<td>{format(new Date(filteredJob.date_applied), "MM/dd/yyyy")} </td>

				)}
				<td className="action-col">
					<a onClick={() => updateJob(filteredJob)} size="sm" className="action-links">
					    Edit
					</a>
					<a onClick={() => deleteJob(filteredJob._id)} size="sm" className="action-links" >
					    Delete
					</a>
				</td>
			</tr>
		);
	})

	let table_data = applications.map((application, index) => {
	    console.log(application._id);
		return (
			<tr data-index={index} key={application._id}>
				<td>{application.company}</td>

				<td>{application.position}</td>
                <td>{application.skills}</td>
				<td><BadgeStatus statusSelected={application.status}/></td>
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

		<div className="jobAppContainer">
		    <Row>
		        <Col md={8}><h1><strong>Applications</strong></h1></Col>
		        <Col md={4}>
		            <Button variant="primary" size="lg" className="btn btn-primary btn-add" onClick = {() => navigate("/applications/add-job")}>
                        Add Job Application
                    </Button>
                </Col>
		    </Row>
            <FilterJobs filterValueSelected={onFilterValuesSelected} />
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
						name="skills"
						value={updatedJob.skills ? updatedJob.skills : ""}
						onChange={handleChange}
						required
						>
                            <option label="Select skills"></option>
                            {skillsData.map((skill) => (
                                <option key={skill._id} value={skill.skill_name}>
                                  {skill.skill_name}
                                </option>
                              ))}

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
						<option label="Select a Status"></option>
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
						onChange={handleChange}
						required
						/>
					</FloatingLabel>

					</Form.Group>
				</Form>

				</Modal.Body>
				<Modal.Footer>
				<Stack direction="horizontal" gap={3}>
					<Button variant="outline-secondary" className="cancel-btn" onClickCapture={handleClose}>
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
                            {isFiltered ? (
                                <tbody>{filtered_table_data}</tbody>

                            ) : (
                                <tbody>{table_data}</tbody>
                            )}
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