import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Button from 'react-bootstrap/Button';
import { editPost } from '../../../api/employee';
import classes from './Edit.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FORM = (props) => {
    const [employees, setEmployees] = useState(
        [

        ]
    )
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/employees/' + props.match.params.id).then(res => {
            setLoading(false);
            setEmployees(res.data);

        })
            .catch(error => {
                props.history.push('/');
            })
        // eslint-disable-next-line
    }, [])


    const [credentials, setCredentials] = useState(
        {
            "empCd": employees.empCd,
            "name": employees.name,
            "designation": employees.designation,
            "dept": employees.dept,
            "attendance": employees.attendance
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
        editPost(credentials, props.match.params.id, props);
        toast.success('Employee successfully edited', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const renderForm = loading === true ? <div className={classes.spinner}><Loader
        type="Circles"
        color="#00BFFF"
        height={150}
        width={150}

    /></div> : <div>
        <h3 className={classes.head}>Edit Employee</h3>

        <Form className={classes.edit} onSubmit={submitHandler}>
            <Col>
                <Row>
                    <Form.Label>empCd</Form.Label>
                    <Form.Control defaultValue={employees.empCd} disabled onChange={(event) => handleChange(event, 'empCd')} />
                </Row>
                <Row>
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={employees.name} required onChange={(event) => handleChange(event, 'name')} />
                </Row>
                <Row>
                    <Form.Label>Designation</Form.Label>
                    <Form.Control defaultValue={employees.designation} required onChange={(event) => handleChange(event, 'designation')} />
                </Row>
                <Row>
                    <Form.Label>Department</Form.Label>
                    <Form.Control defaultValue={employees.dept} required onChange={(event) => handleChange(event, 'dept')} />
                </Row>
                <Row>
                    <Button variant="success" type="submit" block className={classes.button}>
                        Submit
                        </Button>
                </Row>
            </Col>
        </Form>
    </div>
    return (
        <div>
            {renderForm}
        </div>
    )
}
export default FORM;