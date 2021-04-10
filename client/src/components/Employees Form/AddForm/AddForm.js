import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { createPost } from '../../../api/employee';
import classes from "./AddForm.module.css";


const FORM = (props) => {
    const [credentials, setCredentials] = useState(
        {
            "empCd": "",
            "name": "",
            "designation": "",
            "dept": ""
        }
    )
    const handleChange = (event, id) => {
        setCredentials({
            ...credentials,
            [id]: event.target.value
        });
    }
    async function submitHandler(event) {
        event.preventDefault();
        let newCredentials = {...credentials};
        console.log(localStorage.getItem('username'));
        newCredentials['username'] = localStorage.getItem('username');
        createPost(newCredentials);
        props.history.push({pathname:"/employees",data:"Employee added successfully!"});
    }
    return (
        <div>
            <h3 className={classes.head}>Add Employee</h3>
            <Form className={classes.addForm} onSubmit={submitHandler}>
                <Col>
                    <Row>
                        <Form.Label>empCd</Form.Label>
                        <Form.Control required onChange={(event) => handleChange(event, 'empCd')} />
                    </Row>
                    <Row>
                        <Form.Label>Name</Form.Label>
                        <Form.Control required onChange={(event) => handleChange(event, 'name')} />
                    </Row>
                    <Row>
                        <Form.Label>Designation</Form.Label>
                        <Form.Control required onChange={(event) => handleChange(event, 'designation')} />
                    </Row>
                    <Row>
                        <Form.Label>Department</Form.Label>
                        <Form.Control required onChange={(event) => handleChange(event, 'dept')} />
                    </Row>
                    <Row>
                        <Button variant="success" type="submit" block className={classes.button}>
                            Submit
                        </Button>
                    </Row>

                </Col>
            </Form>
        </div>
    )
}
export default FORM;    