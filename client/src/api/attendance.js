import axios from 'axios';

const url = '/employees/attendance/';

export const logAttendance = (data, id, props) => {
    axios.post(url + 'log/' + id, data)
        .then((res) => props.history.push(
            { pathname: '/employees', data: "Attendance Logged!" }))
        .catch((err) => props.history.push(
            { pathname: '/employees', data: "Employee is on leave this day" }));
}

export const getAttendance = (data, id, initializeDate, props) => {
    axios.post(url + 'show/' + id, data)
        .then((data) => initializeDate(data.data))
        .catch((err) => props.history.push('/'));
}

export const getMonthAttendance = (data, id, initializeDate, props) => {
    axios.post(url + 'view/' + id, data)
        .then((res) => {
            initializeDate(res.data)
        })
        .catch((err) => props.history.push('/')
        );
}
