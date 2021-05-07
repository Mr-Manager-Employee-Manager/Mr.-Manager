import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'date-fns';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress'
import DateFnsUtils from '@date-io/date-fns';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { MDBInput } from 'mdbreact';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';

import { leaveRequest, markLeave } from '../../../api/leave';
import Alert from 'react-bootstrap/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestLeave = (props) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [leaveDays, setLeaveDays] = useState(1);
    const [reason,setReason]=useState("");
    const [loading, setLoading] = useState(true);

    const monthNum = (month) => {
        if (month === "Jan")
            return 1;
        else if (month === "Feb")
            return 2;
        else if (month === "Mar")
            return 3;
        else if (month === "Apr")
            return 4;
        else if (month === "May")
            return 5;
        else if (month === "Jun")
            return 6;
        else if (month === "Jul")
            return 7;
        else if (month === "Aug")
            return 8;
        else if (month === "Sep")
            return 9;
        else if (month === "Oct")
            return 10;
        else if (month === "Nov")
            return 11;
        else if (month === "Dec")
            return 12;
        else
            return 0;
    }
    const requestLeave = (event) => {
        event.preventDefault();
        let curDate = new Date(selectedDate).toString();
        const data = {
            "year": curDate.slice(11, 15),
            "month": monthNum(curDate.slice(4, 7)).toString(),
            "date": curDate.slice(8, 10),
        }
        const leaveData = {
            "admin": localStorage.getItem('username'),
            "empCd": localStorage.getItem('empID'),
            "date": data,
            "id":props.match.params.id,
            "days": leaveDays,
            "reason": reason,
            "name":localStorage.getItem('empName'),
            "status": "pending"
        }
        toast.info('Leave Requested', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        leaveRequest(leaveData);
    }
    const handleDateChange = (date) => {
        setSelectedDate(date);
    }
    // Sat Jan 16 2021 17:48:21 GMT+0530 (India Standard Time)
    const [alerts, setAlerts] = useState(null);
    return (
        <div>
            {alerts}
            <Form onSubmit={(event) => requestLeave(event)} style={{ marginTop: "50px", marginBottom: "20px" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            //disableToolbar
                            showTodayButton
                            variant='dialog'
                            format='MM/dd/yyy'
                            margin='normal'
                            id='date-picker'
                            label='Date'
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date'
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <hr />
                <div>
                    <span style = {{padding: "8px", fontSize: "1.1rem", fontWeight: "500", marginBottom: "150px", margin: "0 44%"}}>Number of Days</span>
                    <input style={{ margin: "20px 48%", width: "4%" }} type="number" min="1" max="10" value={leaveDays} onChange={(event) => setLeaveDays(event.target.value)} />
                </div>
                <div style={{ width: "30%", margin: "0 35%" }}>
                    <span style = {{padding: "8px", fontSize: "1.1rem", fontWeight: "500", marginBottom: "150px"}}>Reason</span>
                    <MDBInput value = {reason} onChange = {(event) => setReason(event.target.value)} style={{marginTop: "3px"}} type="textarea" rows="5" />
                </div>
                <Row>
                    <Button variant="success" type="submit" block style={{ margin: "20px 40%", width: "60%" }}>
                        Submit
                    </Button>
                </Row>
            </Form>
        </div>
    )
}
export default withRouter(RequestLeave);