import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { markLeave, declineLeave } from '../../../../api/leave';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './LeaveCard.module.css';

const Leave = (props) => {
    const [empName, setEmpName] = useState("");
    const [status, setStatus] = useState("pending");

    const acceptHandler = () => {
        markLeave(props.data);
        setStatus("Accepted");
        toast.success('Request Accepted', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        console.log("leave marked yeah");
    }

    const declineHandler = () => {
        declineLeave(props.data);
        setStatus("Declined");
        toast.error('Request Declined', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        console.log("leave marked yeah");
    }
    let buttons = (<div>        
        < Button onClick={() => acceptHandler()} style={{width: "100%", marginTop:"10px" }} variant="outline-success" block ><strong>Accept</strong></Button >
        <Button onClick={() => declineHandler()} style={{width: "100%",  marginTop:"10px" }} variant="outline-danger" block><strong>Decline</strong></Button>
    </div>);
    if (status !== "pending") {
        buttons = <Button style={{ width:"100%", marginTop:"10px", cursor: "not-allowed" }} variant="secondary" block disabled > {status}</Button >
    }
    return (
        <div style={{marginBottom:"10px"}}>
            <Card className={classes.posts}>
                <Card.Header as="h5">{props.data.name}</Card.Header>
                <Card.Body style={{background:"#f2f2f2"}}>
                <Row>
                <Col sm={12} md={9}>
                        <Card.Title style={{ width:"50%" }}><strong>Reason: </strong></Card.Title>
                            <Card.Text>
                                {props.data.reason}
                            </Card.Text>
                        </Col>
                        <Col sm={12} md={3}>
                            {buttons}
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer className="text-muted"><span className={classes.footer1}><strong>Date: </strong>{props.data.date.date}/{props.data.date.month}/{props.data.date.year}</span><span className={classes.footer2}><strong>Number of days: </strong>{props.data.days}</span></Card.Footer>
            </Card>
        </div>
    )
}
export default Leave;