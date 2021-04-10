import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { fetchPosts } from '../../../api/employee';
import classes from "./Filter.module.css";


const FORM = (props) => {
    const [credentials, setCredentials] = useState({});
    const handleChange = (event, id) => {
        setCredentials({
            ...credentials,
            [id]: event.target.value
        });
    }
    const submitHandler = (event) => {
        event.preventDefault();
        let newCredentials = {...credentials};
        newCredentials["username"] = localStorage.getItem("username");
        fetchPosts(newCredentials, props.filterEmployee)
    };
//#283747
    return (
        <div style={{backgroundColor: "#283747", color: "white", width:"100%", paddingTop: "5px", marginTop: "16px", boxShadow:"rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"}}>
            <h3 style={{marginBottom: "15px"}} className={classes.head}><u>Search Employees</u></h3>
            <Form style={{backgroundColor: "#283747", width:"90%"}} className={classes.filter} onSubmit={submitHandler}>
                <Col>
                    <Row style={{marginBottom:"10px"}}>
                        <Form.Label>Employee Code</Form.Label>
                        <Form.Control onChange={(event) => handleChange(event, 'empCd')} />
                    </Row>
                    <Row style={{marginBottom:"10px"}}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(event) => handleChange(event, 'name')} />
                    </Row>
                    <Row style={{marginBottom:"10px"}}>
                        <Form.Label>Designation</Form.Label>
                        <Form.Control onChange={(event) => handleChange(event, 'designation')} />
                    </Row>
                    <Row style={{marginBottom:"10px"}}>
                        <Form.Label>Department</Form.Label>
                        <Form.Control onChange={(event) => handleChange(event, 'dept')} />
                    </Row>
                    <Row style={{marginBottom:"10px"}}>
                        <Button type="submit" variant="info" block className={classes.button}>
                            Submit
                    </Button>
                    </Row>

                </Col>
            </Form>
        </div>
    )
}
export default FORM;    