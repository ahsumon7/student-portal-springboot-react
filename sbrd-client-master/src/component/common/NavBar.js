import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
	// State to track whether the user is authenticated
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		// Check if user is logged in by looking for a token in localStorage
		const token = localStorage.getItem("authToken");
		if (token) {
			setIsAuthenticated(true);  // User is authenticated
		} else {
			setIsAuthenticated(false);  // User is not authenticated
		}
	}, []);

	// Function to handle logout
	const handleLogout = () => {
		localStorage.removeItem("authToken");  // Remove the auth token from localStorage
		setIsAuthenticated(false);  // Update the authentication state
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
			<div className="container-fluid">
				<Link className="navbar-brand" to={"/"}>
					SBR Demo
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						{/* Always visible link */}
						<li className="nav-item">
							<Link className="nav-link active" to={"/view-students"}>
								View All Students
							</Link>
						</li>

						{/* Always show "Add New Students" link */}
						<li className="nav-item">
							<Link className="nav-link" to={"/add-students"}>
								Add New Students
							</Link>
						</li>

						{/* Render these links only if the user is authenticated */}
						{isAuthenticated ? (
							<>
								{/* Logout link */}
								<li className="nav-item">
									<button className="nav-link btn btn-link" onClick={handleLogout}>
										Logout
									</button>
								</li>
							</>
						) : (
							// Render these links if the user is not authenticated
							<>
								<li className="nav-item">
									<Link className="nav-link" to={"/login"}>
										Login
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to={"/register"}>
										Register
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
