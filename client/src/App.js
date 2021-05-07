import React, { useState } from 'react';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Navbar from './components/UI/Navbar/Navbar';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Employees from './components/Employees/Employees';
import Form from './components/Employees Form/AddForm/AddForm';
import Home from './components/Home/Home';
import EditForm from './components/Employees Form/EditForm/EditForm';
import LogAttendance from './components/Attendance/LogAttendance/LogAttendance';
import ViewAttendance from './components/Attendance/ViewAttendance/ViewAttendance';
import Profile from './components/Profile/Profile';
import Alert from 'react-bootstrap/Alert';
import About from './components/About us/About';
import EmpLogin from './components/Auth/EmployeeLogin/EmpLogin';
import Leave from './components/Leave/RequestLeave/RequestLeave';
import Notification from './components/Notification/Notification';

const App = () => {
    const [show, setShow] = useState(true);
    const alerts = <Alert show={show} variant="warning" onClose={() => setShow(false)} dismissible >Join our community for free!</Alert>
    let routes = (
        <div>
            {alerts}
            <Switch>
                <Route exact path="/login" render={() => <Login />} />
                <Route exact path="/empLogin" render={() => <EmpLogin />} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path='/' render={() => <Home />} />
                <Redirect to='/login' />;
            </Switch>
        </div>
    );
    if (localStorage.getItem('username')) {
        if (localStorage.getItem('isAdmin') === "true") {
            routes = (
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path='/employees' component={Employees} />
                    <Route exact path='/:id/attendance/view' component={ViewAttendance} />
                    <Route exact path="/leaves" component={Notification} />
                    <Route exact path='/employees/:id' component={Profile} />
                    <Route exact path='/:id/attendance/log' component={LogAttendance} />
                    <Route exact path='/add' component={Form} />
                    <Route exact path='/employees/:id/edit' component={EditForm} />
                </Switch>
            );
        }
        else {
            routes = (
                <Switch>
                    {/* <Route exact path='/' component={Home} /> */}
                    <Route exact path="/about" component={About} />
                    <Route exact path='/:id/attendance/view' component={ViewAttendance} />
                    <Route exact path='/employees/:id' component={Profile} />
                    <Route exact path='/:id/leave' component={Leave} />
                    <Redirect to={'/employees/' + localStorage.getItem('username')}  />
                </Switch>
            );
        }

    }
    return (
        <div>
            <Navbar></Navbar>
            <div style={{ margin: "60px 10px", marginBottom: "10px" }}>
                {routes}
            </div>


        </div>
    )
}
export default withRouter(App);