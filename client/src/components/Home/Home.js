import React from 'react';
import Button from 'react-bootstrap/Button';
import classes from './Home.module.css';
import { withRouter } from 'react-router-dom';

const Home = (props) => {
    const onLoginHandler = () => {
        props.history.push('/login');
    }
    const LoggedinHandler = () => {
        props.history.push('/employees');
    }
    let homeButton = <Button onClick={onLoginHandler} size="lg" style={{ margin: "10px", marginBottom: "5px", width: "25%" }}>Login</Button>
    if (localStorage.getItem('username')) {
        homeButton = <Button onClick={LoggedinHandler} size="lg" style={{ margin: "10px", marginBottom: "5px", width: "30%" }}>View Employees</Button>
    }
    return (
        <div className={classes.head} >
            <div style={{ paddingTop: "150px", textAlign: "center", color: "white", fontSize: "1.2rem" }}>
                <h1>Attendance Manager</h1>
                <p> Welcome to Attendance Manager!</p>
                <p> One stop destination to log and maintain the attendance of employees and to organize employee's data </p>
                {homeButton}
            </div>
        </div >
    );
}

export default withRouter(Home);