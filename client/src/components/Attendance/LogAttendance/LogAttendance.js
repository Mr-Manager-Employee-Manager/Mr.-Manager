import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import 'date-fns';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';

import { logAttendance, getAttendance } from '../../../api/attendance';
import Alert from 'react-bootstrap/Alert';

const Log = (props) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [checkedIn, setCheckedIn] = useState(undefined);
    const [checkedOut, setCheckedOut] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [inTimeArr, setInTimeArr] = useState(null);
    const [outTimeArr, setOutTimeArr] = useState(null);

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

    const initializeDate = (data) => {
        if (data) {
            setInTimeArr(data.inTime);
            setOutTimeArr(data.outTime);
            if (data.calendarIn)
                setCheckedIn(new Date(data.calendarIn));
            else
                setCheckedIn(undefined);
            if (data.calendarOut)
                setCheckedOut(new Date(data.calendarOut));
            else
                setCheckedOut(undefined);
        }
        else {
            setInTimeArr(null);
            setOutTimeArr(null);
            setCheckedIn(undefined);
            setCheckedOut(undefined);
        }
        setLoading(false);
    }
    let counter, table = null, table2 = null;
    const initializeTable = () => {
        counter = 0;
        if (inTimeArr && outTimeArr) {
            table = inTimeArr.map((el, ind) => {
                counter++;
                let checkOut = null;
                if (outTimeArr[ind])
                    checkOut = <td>{outTimeArr[ind].hour}:{outTimeArr[ind].minute}</td>
                else
                    checkOut = <td>Yet to check out</td>
                return (<tr key={counter}>
                    <td style={{ padding: "0px", width: "10%" }}><i style={{ marginTop: "15px" }} className="far fa-clock"></i></td>
                    <td>{inTimeArr[ind].hour}:{inTimeArr[ind].minute}</td>
                    {checkOut}
                </tr>)
            })
        }
        table2 = (
            <Table striped bordered style={{ width: '50%', margin: '0px auto', textAlign: "center" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>In Time</th>
                        <th>Out Time</th>
                    </tr>
                </thead>

                <tbody>
                    {table}
                </tbody>
            </Table>
        )
    };

    useEffect(() => {
        let curDate = new Date(selectedDate).toString();
        const data = {
            "year": curDate.slice(11, 15),
            "month": monthNum(curDate.slice(4, 7)).toString(),
            "date": curDate.slice(8, 10),
        }
        getAttendance(data, props.match.params.id, initializeDate, props);
        // eslint-disable-next-line
    }, [selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    // Sat Jan 16 2021 17:48:21 GMT+0530 (India Standard Time)
    const checkInHandler = (event) => {
        event.preventDefault();
        const calendar = selectedDate.toString();
        const data = {
            "year": calendar.slice(11, 15),
            "month": monthNum(calendar.slice(4, 7)).toString(),
            "date": calendar.slice(8, 10),
            "inTime": {
                "hour": calendar.slice(16, 18),
                "minute": calendar.slice(19, 21)
            },
            "outTime": undefined,
            "calendarIn": new Date(selectedDate),
            "calendarOut": undefined
        };
        logAttendance(data, props.match.params.id,props);
    }
    const [alerts, setAlerts] = useState(null);
    const checkOutHandler = (event) => {
        event.preventDefault();
        const calendar = selectedDate.toString();
        const calendarIn = checkedIn.toString();
        const data = {
            "year": calendar.slice(11, 15),
            "month": monthNum(calendar.slice(4, 7)).toString(),
            "date": calendar.slice(8, 10),
            "inTime": {
                "hour": calendarIn.slice(16, 18),
                "minute": calendarIn.slice(19, 21)
            },
            "outTime": {
                "hour": calendar.slice(16, 18),
                "minute": calendar.slice(19, 21)
            },
            "calendarIn": new Date(checkedIn),
            "calendarOut": new Date(selectedDate)
        };
        let inTime = (+data.inTime.hour) * 60 + (+data.inTime.minute);
        let outTime = (+data.outTime.hour) * 60 + (+data.outTime.minute)
        let totalMinutes = (outTime - inTime);
        if (totalMinutes >= 0) {
            logAttendance(data, props.match.params.id,props);
        }
        else {
            setAlerts(<Alert variant="danger">Out Time must be greater than In Time !</Alert>);
        }

    }

    let buttonIn, buttonOut;
    if (!checkedIn && !checkedOut) {
        buttonIn = <Button className="primary" size="lg"
            onClick={checkInHandler} style={{ margin: "20px" }}>Check In</Button>
        buttonOut = <Button disabled variant="primary" type="submit" size="lg"
            onClick={checkOutHandler} style={{ margin: "20px" }}>Check Out</Button>
    }
    else if (checkedIn && !checkedOut) {
        buttonIn = <Button disabled variant="primary" size="lg"
            onClick={checkInHandler} style={{ margin: "20px" }}>Checked In</Button>;
        buttonOut = <Button variant="primary" type="submit" size="lg"
            onClick={checkOutHandler} style={{ margin: "20px" }}>Check Out</Button>
    }
    else {
        buttonIn = <Button variant="primary" size="lg"
            onClick={checkInHandler} style={{ margin: "20px" }}>Check In Again</Button>;
        buttonOut = <Button disabled variant="primary" type="submit" size="lg"
            onClick={checkOutHandler} style={{ margin: "20px" }}>Check Out</Button>
    }

    let buttons = (
        <div style={{ textAlign: "center", margin: "30px" }}>
            <CircularProgress />
        </div>
    );

    if (!loading) {
        buttons = (
            <div style={{ textAlign: "center", margin: "0 0" }}>
                {buttonIn}
                {buttonOut}
            </div>)
    }
    initializeTable();
    return (
        <div>
                {alerts}
                <Form style={{ marginTop: "50px", marginBottom: "20px" }}>
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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardTimePicker
                                margin='normal'
                                id='time-picker'
                                label='Time'
                                value={selectedDate}
                                onChange={handleDateChange}
                                //ampm={false}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <hr />
                    {buttons}
                </Form>
                {table2}
        </div>
    )
}
export default withRouter(Log);