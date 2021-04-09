import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import { Link } from 'react-router-dom';
import classes from "./Navbar.module.css";

const navbar = (props) => {

    const logoutHandler = () => {
        axios.get('/logout').then(() => {
            localStorage.removeItem('username');
            localStorage.removeItem('isAdmin');
            console.log("logged out");
            props.history.push('/');
        })
    }

    let authStatus = (
        <div style={{ fontSize: "1.2rem" }}>
            <Nav style={{ "display": "inline", marginRight: "20px", textDecoration: "none" }}>
                <Link style={{ textDecoration: "none" }} to='/login' className={classes.auth}>Log in</Link>
            </Nav>
            <Nav style={{ "display": "inline", textDecoration: "none" }}>
                <Link style={{ textDecoration: "none" }} to='/register' className={classes.auth}>Register</Link>
            </Nav>
        </div>
    );
    if (localStorage.getItem('username')) {
        authStatus = (
            <Nav.Link onClick={logoutHandler} className={classes.auth}>
                Sign out
            </Nav.Link>
        )
    }

    return (
        <div style={{ marginBottom: "70px" }}>
            <Navbar style={{ backgroundColor: "#283747" }} fixed="top" collapseOnSelect expand="lg" variant="dark">
                <img
                    src="/Logo.jpg"
                    width="45"
                    height="45"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
                <Link to='/' style={{ textDecoration: "none", color: "white", fontSize: "25px", margin: "0 20px" }}>Attendance Manager</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {localStorage.getItem('isAdmin') === "true" ? <Nav.Link><Link style={{ margin: "0 15px" }} to='/add' className={classes.button}>Add Employee</Link></Nav.Link> : null}
                        <Nav.Link><Link style={{ margin: "0 15px" }} to='/employees' className={classes.button} >View Employees</Link></Nav.Link>
                    </Nav>
                    <Nav.Link className={classes.auth}>
                        <Link to='/about' className={classes.button}>Developers</Link>
                    </Nav.Link>
                    {authStatus}

                </Navbar.Collapse>
            </Navbar>

        </div >
    );
}

export default withRouter(navbar);

