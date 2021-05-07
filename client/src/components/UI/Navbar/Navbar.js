import React, {useEffect,useState} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import { Link } from 'react-router-dom';
import classes from "./Navbar.module.css";
import Badge from 'react-bootstrap/Badge'

const NAvbar = (props) => {

    const [leaves, setLeaves] = useState(0);
    useEffect(() => {
        axios.get('leaves/' + localStorage.getItem('username')).then(res => {
            let cnt=0;
            for(let i in res.data)
            {
                if(res.data[i].status==="pending") cnt++;
            }
            setLeaves(cnt);
        })
            .catch(error => {
                props.history.push('/');
            })
    }, [])
    const logoutHandler = () => {
        axios.get('/logout').then(() => {
            localStorage.removeItem('username');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('empID');
            localStorage.removeItem('empName');
            localStorage.removeItem('emp_id');
            props.history.push('/');
        })
    }
    
    let authStatus = (
        <div style={{ fontSize: "1.2rem" }}>
            <Nav className = {classes.reglog} style = {{marginRight: "12px"}}>
                <Link style={{ textDecoration: "none" }} to='/login' className={classes.auth}>Login</Link>
            </Nav>
            <Nav className = {classes.reglog}>
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
    //navbar component
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
                <Link to='/' style={{ textDecoration: "none", color: "white", fontSize: "25px", margin: "0 12px" }}>Mr. Manager</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" style={{padding:"0px"}}>
                    <Nav className="mr-auto">
                        {localStorage.getItem('isAdmin') === "true" ? <Nav.Link><Link style={{ margin: "0 15px", padding: "0px" }} to='/add' className={classes.button}>Add Employee</Link></Nav.Link> : null}
                        {localStorage.getItem('isAdmin') === "true" ? <Nav.Link className = {localStorage.getItem('isAdmin') ? classes.theEnd : null} ><Link style={{ margin: "0 15px", padding: "0px" }} to='/employees' className={classes.button} >View Employees</Link></Nav.Link> : null }
                    </Nav>
                    {/* <Nav.Link style = {{padding: "0px", marginRight: "15px"}}>
                        <Link to='/about' className = {classes.button}>Developers</Link>
                    </Nav.Link> */}
                    {localStorage.getItem('isAdmin')==='true' ? <Nav.Link style = {{padding: "0px", marginRight: "15px"}}>
                        <Link to={{pathname:'/leaves', setNo:setLeaves}} className = {classes.button}><i onClick={()=>setLeaves("")} class="fas fa-bell" alt="Notifications"></i><Badge style={{marginLeft:"5px"}} variant="info">{leaves}</Badge></Link>
                    </Nav.Link>:null}
                    {authStatus}

                </Navbar.Collapse>
            </Navbar>

        </div >
    );
}

export default withRouter(NAvbar);

