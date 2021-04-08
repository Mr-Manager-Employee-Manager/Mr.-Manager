import axios from 'axios';

const url = '/employees/attendance/';

export const logAttendance = (data, id) => {
    axios.post(url + 'log/' + id, data)
        .then(() => console.log("Attendance logged"))
        .catch((err) => console.log(err));
}

export const getAttendance = (data, id, initializeDate, props) => {
    axios.post(url + 'show/' + id, data)
        .then((data) => initializeDate(data.data))
        .catch((err) => props.history.push('/'));
}

export const getMonthAttendance = (data, id, initializeDate,props) => {
    axios.post(url + 'view/' + id, data)
        .then((res) => {
            initializeDate(res.data)
        })
        .catch((err) => props.history.push('/')
        );
}
