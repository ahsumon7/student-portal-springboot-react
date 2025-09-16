import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddStudent = () => {
	let navigate = useNavigate();
	const [student, setStudent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		department: "",
	});
	const { firstName, lastName, email, department } = student;

	const handleInputChange = (e) => {
		setStudent({
			...student,
			[e.target.name]: e.target.value,
		});
	};

	const saveStudent = async (e) => {
		e.preventDefault();
		await axios.post("http://localhost:9192/students", student);
		navigate("/view-students");
	};

	return (
		<div className="container py-5">
			<div className="row justify-content-center">
				<div className="col-sm-8 shadow p-4">
					<h2 className="mb-4">Add Student</h2>
					<form onSubmit={(e) => saveStudent(e)}>
						<div className="mb-3">
							<label htmlFor="firstName" className="form-label">
								First Name
							</label>
							<input
								className="form-control"
								type="text"
								name="firstName"
								id="firstName"
								required
								value={firstName}
								onChange={handleInputChange}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="lastName" className="form-label">
								Last Name
							</label>
							<input
								className="form-control"
								type="text"
								name="lastName"
								id="lastName"
								required
								value={lastName}
								onChange={handleInputChange}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="email" className="form-label">
								Email
							</label>
							<input
								className="form-control"
								type="email"
								name="email"
								id="email"
								required
								value={email}
								onChange={handleInputChange}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="department" className="form-label">
								Department
							</label>
							<input
								className="form-control"
								type="text"
								name="department"
								id="department"
								required
								value={department}
								onChange={handleInputChange}
							/>
						</div>

						<div className="d-flex justify-content-between">
							<button type="submit" className="btn btn-outline-success">
								Save
							</button>
							<Link
								to="/view-students"
								className="btn btn-outline-warning"
							>
								Cancel
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddStudent;
