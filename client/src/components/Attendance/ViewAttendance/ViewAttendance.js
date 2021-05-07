import React, { useState, useEffect } from 'react';
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';
import Table from 'react-bootstrap/Table';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from 'react-bootstrap/Button';
import classes from './ViewAttendance.module.css';
import { getMonthAttendance } from '../../../api/attendance';
import Card from 'react-bootstrap/Card';
import { withRouter } from 'react-router-dom';
import CardColumns from 'react-bootstrap/CardColumns'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

const View = (props) => {

    const [selectedDate, handleDateChange] = useState(new Date());
    const [monthData, setMonthData] = useState();
    const [employee, setEmployee] = useState('Employee');
    let totalMinutes = 0;
    const noOfDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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

    useEffect(() => {
        const calendar = selectedDate.toString();
        const data = {
            "year": calendar.slice(11, 15),
            "month": monthNum(calendar.slice(4, 7)).toString()
        };
        const initializeDate = (data) => {
            setEmployee(data[0].name);
            setMonthData(data[1]);
        }
        getMonthAttendance(data, props.match.params.id, initializeDate, props);
        // eslint-disable-next-line 
    }, [selectedDate, props.match.params.id])

    let table2 = new Array(32);
    totalMinutes = 0;
    if (monthData && monthData.date) {
        for (let i = 1; i <= noOfDays[+monthData.value]; i++) {
            let counter, table = null, inTimeArr = null, outTimeArr = null;
            counter = 0;
            if (monthData.date[i] && monthData.date[i].isLeave) {
                table2[i] = (<div style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "25px", fontWeight: "400" }}>Date: {i}</span>
                    <Alert variant="info"><span style={{fontWeight:"600"}}>On Leave</span></Alert>
                </div>)
                continue;
            }
            if (monthData.date[i]) {
                totalMinutes += monthData.date[i].totalMinutes;
                inTimeArr = monthData.date[i].inTime;
                outTimeArr = monthData.date[i].outTime;
            }
            else {
                table2[i] = (
                    <div style={{ textAlign: "center" }}>
                        <span style={{ fontSize: "25px", fontWeight: "400" }}>Date: {i}</span>
                        <p>N/A</p>
                    </div>)
                continue;
            }
            if (inTimeArr && outTimeArr) {

                table = inTimeArr.map((el, ind) => {
                    counter++;
                    let checkOut = null;
                    if (outTimeArr[ind]) {
                        checkOut = <td>{outTimeArr[ind].hour}:{outTimeArr[ind].minute}</td>
                    }
                    else
                        checkOut = <td>Yet to check out</td>
                    return (<tr key={counter}>
                        <td style={{ padding: "0px", width: "10%" }}><i style={{ marginTop: "15px" }} className="far fa-clock"></i></td>
                        <td>{inTimeArr[ind].hour}:{inTimeArr[ind].minute}</td>
                        {checkOut}
                    </tr>)
                })
            }

            table2[i] = (
                <div style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "25px", fontWeight: "400" }}>Date: {i}</span>
                    <Table striped bordered style={{ width: '85%', margin: '13px auto', textAlign: "center", backgroundColor: "#edfbfc" }}>
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
                    <hr />
                </div>
            )
        }
    }
    const tables = table2.map((el, id) => <Card style={{ backgroundColor: "white" }} key={id}>{el}</Card>)
    let outputTable = <CardColumns>{tables}</CardColumns>
    let output = <Row className={classes.spinner} style={{ margin: "250px 0" }}><Loader
        type="Circles"
        color="#00BFFF"
        height={150}
        width={150}
    /></Row>

    if (employee !== 'Employee') {
        output = (
            <div>
                <h1 style={{ textAlign: "center" }}>{employee}'s Attendance</h1>
                <hr></hr>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" style={{ marginBottom: "40px" }}>
                        <DatePicker
                            showTodayButton
                            variant="dialog"
                            openTo="year"
                            views={["year", "month"]}
                            label="Year and Month"
                            // helperText="Select Month and Year"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <h3 style={{ textAlign: "center", margin: "20px" }}>Total Hours: {Math.round(+totalMinutes / 60)}</h3>
                {outputTable}
                <Button className={classes.topButton} href="#top"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                </svg></Button>
            </div>
        );
    }

    return (
        <div>
            { output}
        </div>
    );
}

export default withRouter(View);