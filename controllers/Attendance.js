import Employee from '../models/Employee.js'

export const createEmployee = (req, res) => {
    let employee = req.body;
    let newEmployee = new Employee(employee);
    newEmployee.save()
        .then(() => res.json(newEmployee))
        .catch(err => res.status(400).json('Error: ' + err));
}

export const logAttendance = (req, res) => {
    Employee.findById(req.params.id)
        .then((employee) => {
            let found = employee.attendance.find(year => year.value == req.body.year);
            if (found == undefined) {
                let inTime = (+req.body.inTime.hour) * 60 + (+req.body.inTime.minute);
                let outTime = inTime;
                if (req.body.outTime)
                    outTime = (+req.body.outTime.hour) * 60 + (+req.body.outTime.minute)
                let totalMinutes = (outTime - inTime);
                let date = new Array(32);
                date[+req.body.date] = {
                    value: req.body.date,
                    inTime: [req.body.inTime],
                    outTime: [req.body.outTime],
                    totalMinutes: totalMinutes,
                    calendarIn: req.body.calendarIn,
                    calendarOut: req.body.calendarOut,
                    "isLeave": false
                };
                let month = new Array(13);
                month[+req.body.month] = {
                    value: req.body.month,
                    date: date
                };
                let year = {
                    value: req.body.year,
                    month: month
                };
                employee.attendance.push(year);
            }
            else {
                if (found.month[+req.body.month]) {
                    let inTime = (+req.body.inTime.hour) * 60 + (+req.body.inTime.minute);
                    let outTime = inTime;
                    if (req.body.outTime) {
                        outTime = (+req.body.outTime.hour) * 60 + (+req.body.outTime.minute);
                    }
                    let totalMinutes = (outTime - inTime);
                    if (found.month[+req.body.month].date[+req.body.date]) {
                        if(found.month[+req.body.month].date[+req.body.date].isLeave)
                            return res.status(400).json('Employee is on leave this day');
                        let arr = found.month[+req.body.month].date[+req.body.date].outTime;
                        if (arr[arr.length - 1] === null) {
                            found.month[+req.body.month].date[+req.body.date].outTime[arr.length - 1] = req.body.outTime;
                            found.month[+req.body.month].date[+req.body.date].calendarIn = req.body.calendarIn;
                            found.month[+req.body.month].date[+req.body.date].calendarOut = req.body.calendarOut;
                            found.month[+req.body.month].date[+req.body.date].totalMinutes += totalMinutes;
                        }
                        else {
                            found.month[+req.body.month].date[+req.body.date].inTime.push(req.body.inTime);
                            found.month[+req.body.month].date[+req.body.date].outTime.push(req.body.outTime);
                            found.month[+req.body.month].date[+req.body.date].calendarIn = req.body.calendarIn;
                            found.month[+req.body.month].date[+req.body.date].calendarOut = req.body.calendarOut;
                            found.month[+req.body.month].date[+req.body.date].totalMinutes += totalMinutes;
                        }
                    }
                    else {
                        found.month[+req.body.month].date[+req.body.date] = {
                            value: req.body.date,
                            inTime: [req.body.inTime],
                            outTime: [req.body.outTime],
                            totalMinutes: totalMinutes,
                            calendarIn: req.body.calendarIn,
                            calendarOut: req.body.calendarOut,
                            "isLeave": false
                        }
                    }
                }
                else {
                    let inTime = (+req.body.inTime.hour) * 60 + (+req.body.inTime.minute);
                    let outTime = inTime;
                    if (req.body.outTime)
                        outTime = (+req.body.outTime.hour) * 60 + (+req.body.outTime.minute)
                    let totalMinutes = (outTime - inTime);
                    let date = new Array(32);
                    date[+req.body.date] = {
                        value: req.body.date,
                        inTime: [req.body.inTime],
                        outTime: [req.body.outTime],
                        totalMinutes: totalMinutes,
                        calendarIn: req.body.calendarIn,
                        calendarOut: req.body.calendarOut,
                        "isLeave": false
                    };
                    found.month[+req.body.month] = {
                        value: req.body.month,
                        date: date
                    }
                }
            }
            Employee.findByIdAndUpdate(req.params.id, employee)
                .then(() => res.status(200).json(employee))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

export const clearAttendance = (req, res) => {
    let { id } = req.params;
    Employee.findById(id)
        .then((employee) => {
            let found = employee.attendance.find(year => year.value == req.body.year);
            if (found) {
                found.month[+req.body.month].date[+req.body.date] = null;
                Employee.findByIdAndUpdate(req.params.id, employee)
                    .then(() => res.status(200).json("Success baby!"))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

export const showAttendance = (req, res) => {
    Employee.findById(req.params.id)
        .then((employee) => {
            let found = employee.attendance.find(year => year.value == req.body.year);
            if (found && found.month[+req.body.month] && found.month[+req.body.month].date[+req.body.date]) {
                let date = found.month[+req.body.month].date[+req.body.date];
                let output = {
                    "totalMinutes": date.totalMinutes,
                    "inTime": date.inTime,
                    "outTime": date.outTime,
                    "calendarIn": date.calendarIn,
                    "calendarOut": date.calendarOut
                }
                res.status(200).json(output);
            }
            else
                res.status(200).json(undefined);
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

export const showMonthAttendance = (req, res) => {
    Employee.findById(req.params.id)
        .then((employee) => {
            let found = employee.attendance.find(year => year.value == req.body.year);
            if (found && found.month[+req.body.month])
                res.status(200).json([employee, found.month[+req.body.month]]);
            else {
                const data = {
                    value: +req.body.month,
                    date: new Array(32)
                };
                res.status(200).json([employee, data]);
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
}