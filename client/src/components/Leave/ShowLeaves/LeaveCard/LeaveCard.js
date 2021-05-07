import React,{useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { markLeave } from '../../../../api/leave';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Leave = (props) => {
    const [empName,setEmpName]=useState("");

    const acceptHandler = () => {
        markLeave(props.data);
        toast.success('Request Allowed', {
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
        markLeave(props.data);
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

    return (
        <div>
            <Card>
                <Card.Header as="h5">{props.data.name}</Card.Header>
                <Card.Body>
                <Row>
                    <Card.Title style={{marginLeft:"10px"}}><strong>Reason: </strong></Card.Title>
                    
                        <Col >
                        <Card.Text>
                            
                        {props.data.reason}
                     </Card.Text>
                        </Col>
                        <Col>
                            <Button onClick = {() => acceptHandler()} style={{width:"70%",marginLeft:"29%"}}  variant="outline-success" block>Allow</Button>
                            <Button onClick = {() => declineHandler()} style={{width:"70%",marginLeft:"29%"}} variant="outline-danger" block>Decline</Button>
                        </Col>
                    </Row>
                    
                    
                </Card.Body>
                <Card.Footer className="text-muted"><span><strong>Date: </strong>{props.data.date.date}/{props.data.date.month}/{props.data.date.year}</span><span style={{float:"right"}}><strong>Number of days: </strong>{props.data.days}</span></Card.Footer>
            </Card>
        </div>
    )
}
export default Leave;