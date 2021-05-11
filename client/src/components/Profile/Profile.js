import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import classes from './Profile.module.css';
import { deletePost } from '../../api/employee';
import { withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Modal } from '../UI/Modal/Modal';
import axios from 'axios';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

const Post = (props) => {
    const [employees, setEmployees] = useState(
        [

        ]
    )
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/employees/' + props.match.params.id).then(res => {
            setLoading(false);
            if (!localStorage.getItem('isAdmin'))
                localStorage.setItem('empName',res.data.name);
            setEmployees(res.data);

        })
            .catch(error => {
                props.history.push('/');
            })
        // eslint-disable-next-line
    }, [])
    const [showDelete, setShowDelete] = useState(false);
    const props2 = employees;
    const editHandler = () => {
        const url = "/employees/" + props2._id + "/edit";
        props.history.push({
            pathname: url,
            res: { data: props2 }
        });
    }
    const attendanceHandler = () => {
        const url = "/" + props.match.params.id + "/attendance/view";
        props.history.push({
            pathname: url,
            res: { data: props2 }
        })
    }
    const leaveHandler = () => {
        const url = "/" + props.match.params.id + "/leave";
        props.history.push({
            pathname: url,
            res: { data: props2 }
        })
    }
    const markedLeaveHandler = () => {
        const url = "/markedLeave";
        props.history.push({
            pathname: url,
            res: { data: props2 }
        })
    }
    const deleteCancelHandler = () => {
        setShowDelete(false);
    }
    const deleteModal = showDelete === true ? <Modal show={showDelete} modalClosed={() => deleteCancelHandler()}>
        <div style={{ textAlign: "center" }}>
            Are you sure you want to delete all the details of {props2.name} ?
        </div>

        <hr></hr>
        <Button variant="info" block onClick={() => deletePost(props2._id, props)}>Yes</Button>
        <Button variant="danger" block onClick={() => setShowDelete(false)}>No</Button>
    </Modal> : null;

    const renderProfile = loading === true ? <div className={classes.spinner}><Loader
        type="Circles"
        color="#00BFFF"
        height={150}
        width={150}

    /></div> : <div style={{ margin: "auto 20px" }}>
        <Row>
            <Col lg={9} sm={12}>
                <Card text="dark" className={classes.emp}>
                    <Card.Body>
                        <Card.Title><div style={{ fontSize: "xx-large", color: "#283747" }}><b>{props2.name}</b></div></Card.Title>
                        <hr style={{ border: "2px solid black" }}></hr>
                        <Card.Text>
                            <span className={classes.divs}>EmpCd </span>:<span className={classes.divs}>{props2.empCd}</span>
                            <span className={classes.divs}>Designation </span>:<span className={classes.divs}>{props2.designation}</span>
                            <span className={classes.divs}>Department </span>:<span className={classes.divs}>{props2.dept}</span>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={3} sm={12}>
                <Card bg="light" className={classes.emp} style={{ marginTop: "50px", padding: "30px" }}>
                    {localStorage.getItem('isAdmin') === "true" ? <Button size="lg" block variant="info" onClick={editHandler}>Edit</Button> : null}
                    {localStorage.getItem('isAdmin') === "true" ? <br></br> : null}
                    <Button size="lg" block variant="info" onClick={attendanceHandler}>View Attendance</Button>
                    {localStorage.getItem('empID') ? <Button size="lg" block variant="info" onClick={leaveHandler}>Request Leave</Button> : null}
                    {localStorage.getItem('empID') ? <Button size="lg" block variant="info" onClick={markedLeaveHandler}>My Leaves</Button> : null}
                    {localStorage.getItem('isAdmin') === "true" ? <br></br> : null}
                    {localStorage.getItem('isAdmin') === "true" ? <Button size="lg" block variant="info" onClick={() => setShowDelete(true)}>Delete</Button> : null}
                </Card>
            </Col>
        </Row>
        {deleteModal}
    </div>
    return (
        <div>
            {renderProfile}
        </div>
    )
}
export default withRouter(Post);