import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import classes from "./LoginForm.module.css";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { withRouter } from 'react-router-dom';

const FORM = (props) => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [alerts,setAlerts]=useState(null);
  const login = (e) => {
    e.preventDefault();
    console.log("going on");
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "/login",
    }).then((res) => {
      localStorage.setItem('isAdmin', "true");
      localStorage.setItem('username', res.data);
      props.history.push({pathname:'/employees',data:"Welcome "+loginUsername+" !"});
    })
      .catch(err => {
        setAlerts(<Alert variant="danger">Authentication Unsuccessful!</Alert>)
      });
  };
  const onChangeHandler = () => {
    props.history.push('/empLogin');
}
  return (
    <div>
      {alerts}
      <div>
        <h3 className={classes.head}>Login</h3>
        <Form className={classes.addForm} onSubmit={(e) => login(e)} >
          <Col>
            <Row>
              <Form.Label>username</Form.Label>
              <Form.Control required onChange={(event) => setLoginUsername(event.target.value)} />
            </Row>
            <Row>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required onChange={(event) => setLoginPassword(event.target.value)} />
            </Row>
            <Row>
              <Button variant="success" type="submit" block className={classes.button}>
                Submit
              </Button>
            </Row>
            <Row>
              <Button onClick={onChangeHandler} size="lg" block style={{fontSize:"15px", width: "100%" }}>Switch to Employee Login</Button>
            </Row>
          </Col>
        </Form>
      </div>
    </div>
  )
}
export default withRouter(FORM);    