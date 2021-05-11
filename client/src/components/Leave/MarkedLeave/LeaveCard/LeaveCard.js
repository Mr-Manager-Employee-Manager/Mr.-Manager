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
                        <Button style={{ width:"100%", marginTop:"10px", cursor: "not-allowed" }} variant="secondary" block disabled > {props.data.status}</Button >
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer className="text-muted"><span className={classes.footer1}><strong>Date: </strong>{props.data.date.date}/{props.data.date.month}/{props.data.date.year}</span><span className={classes.footer2}><strong>Number of days: </strong>{props.data.days}</span></Card.Footer>
            </Card>
        </div>
    )
}
export default Leave;