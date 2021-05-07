import React, { useState, useEffect } from 'react';
import Post from './Employee/Employee';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Row from 'react-bootstrap/Row';
import classes from './Employees.module.css';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import Alert from 'react-bootstrap/Alert';
import { fetchPosts } from '../../api/employee';
import FilterForm from '../Employees Form/FilterForm/FilterForm';

const Posts = (props) => {
    const [employees, setEmployees] = useState(
        [

        ]
    )
    const [show, setShow] = useState(true);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const initializeData = (data) => {
            setEmployees(data);
            setLoading(false);
        }
        const filter = {
            "username": localStorage.getItem('username')
        }
        fetchPosts(filter, initializeData)
    }, [])

    const posts = employees.map((ele, index) => (
        <Post id={ele._id} attendence={ele.attendance}
            key={index} name={ele.name} designation={ele.designation}
            dept={ele.dept} empCd={ele.empCd} />
    ));
    let renderingPosts = loading === true ? <Row style={{ margin: "100px auto" }} className="text-center"><Loader
        type="Circles"
        color="#00BFFF"
        height={150}
        width={150}

    /></Row> : posts;

    const filterEmployeeHandler = (data) => {
        setEmployees(data);
    }
    const filterModal = <FilterForm filterEmployee={(data) => filterEmployeeHandler(data)} />
    const SpinnerClass = loading === true ? classes.spinner : null;
    let alerts = null;
    if (props.location.data === "Attendance Logged!") {
        alerts = <Alert show={show} variant="success" onClose={() => setShow(false)} dismissible >{props.location.data}</Alert>
    }
    else if(props.location.data === "Employee is on leave this day")
        alerts = <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible >{props.location.data}</Alert>
    return (
        <div style={{ margin: "0" }}>
            {alerts}
            <Row>
                <Col lg={3} md={4} sm={12}>
                    {filterModal}
                </Col>
                <Col style={{ SpinnerClass }}>
                    <Row>
                        {renderingPosts}
                    </Row>

                </Col>

            </Row>
            <Button className={classes.topButton} href="#top"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
            </svg></Button>



        </div>
    )
}
export default Posts;