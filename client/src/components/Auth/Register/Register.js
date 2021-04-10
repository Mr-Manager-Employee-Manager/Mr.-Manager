import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import classes from './Register.module.css';
import Alert from 'react-bootstrap/Alert';

const FORM = (props) => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [alerts, setAlerts] = useState(null);
  const register = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "/register",
    }).then((res) => {
      console.log(res);
      localStorage.setItem("username", registerUsername);
      localStorage.setItem("isAdmin", "false");
      props.history.push({ pathname: '/employees', data: "Welcome " + registerUsername + " !" })
    })
    .catch((err) => {
      console.log(err.message);
      if (err.message === 'Request failed with status code 401') {
        setAlerts(<Alert variant="danger">User with such username already exists!</Alert>)
      }
      else {
        setAlerts(<Alert variant="danger">Authorization Unsuccessful!</Alert>)
      }
    });
  };


  return (
    <div>
      {alerts}
      <div>
        <h3 className={classes.head}>Register</h3>
        <Form className={classes.RegisterForm} onSubmit={(e) => register(e)} >
          <Col>
            <Row>
              <Form.Label>Company's Username</Form.Label>
              <Form.Control required onChange={(event) => setRegisterUsername(event.target.value)} />
            </Row>
            <Row>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required onChange={(event) => setRegisterPassword(event.target.value)} />
            </Row>
            <Row>
              <Button variant="success" type="submit" block className={classes.button}>
                Submit
              </Button>
            </Row>
          </Col>
        </Form>
      </div>
    </div>
  )
}
export default FORM;