import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import classes from './Employee.module.css';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Col from 'react-bootstrap/Col';

const Post = (props) => {
    const showProfile = () => {
        props.history.push({
            pathname: "/employees/" + props.id,
            res: { data: props }
        })
    }

    const attendanceHandler = () => {
        const url = "/" + props.id + "/attendance/log";
        props.history.push({
            pathname: url,
            res: { data: props }
        })
    }

    const StyledButton = withStyles({
        root: {
            background: '#29648a',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            margin: "10px 3% 10px 3%",
            padding: '10px 3% 10px 3%',
            boxShadow: '0px 0px 5px 0px white',
            "&:hover": {
                background: "#5085a5"
            }
        },
        label: {
            textTransform: 'capitalize',
        },
    })(Button);

    return (
        <Col lg={4} md={6} sm={12} style={{margin:"15px 0"}}>
            <Card className={classes.posts}>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>

                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>EmpCd: {props.empCd}</ListGroupItem>
                    <ListGroupItem>Designation: {props.designation}</ListGroupItem>
                    <ListGroupItem>Department: {props.dept}</ListGroupItem>
                </ListGroup>
                <Card.Body style={{ padding: '0', textAlign: "center" }}>
                    {localStorage.getItem('isAdmin') === "true" ? <StyledButton onClick={attendanceHandler}>Log Attendance</StyledButton> : null}
                    <StyledButton onClick={showProfile}>View Profile</StyledButton>
                </Card.Body>
            </Card>
        </Col>

    )
}
export default withRouter(Post);