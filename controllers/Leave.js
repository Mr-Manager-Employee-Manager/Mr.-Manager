import Leave from '../models/Leave.js';
import Employee from '../models/Employee.js';

export const leaveRequest = (req, res) => {
    const leaveReq = req.body;
    const newLeaveRequest = new Leave(leaveReq);
    newLeaveRequest.save()
        .then(() => res.status(200).json(leaveReq))
        .catch(err => res.status(400).json('Error: ' + err));
}
export const getLeaves = (req, res) => {
    Leave.find({ "admin": req.params.id }).then(leaves => {
        res.status(200).json(leaves);
    }).catch(err => {
        console.log(err);
    })
}

export const getMarkedLeaves = (req, res) => {
    Leave.find(req.body).then(leaves => {
        res.status(200).json(leaves);
    }).catch(err => {
        console.log(err);
    })
}

export const declineLeave = (req, res) => {
    const leaveDataOrg = req.body;
    leaveDataOrg.status = "declined";
    Leave.findByIdAndUpdate(leaveDataOrg._id, leaveDataOrg)
        .then((leave) => {
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

export const checkIfExists = (req,res) => {
    const data = req.body;
    Leave.find(data)
        .then((leave) => {
            if(leave.length === 0)
                return res.status(200).json("Doesn't Exist");
            else
                return res.status(200).json("Exists");
        })
}


export const markLeave = (req, res) => {
    const noOfDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const leaveDataOrg = req.body;
    leaveDataOrg.status = "accepted";
    Leave.findByIdAndUpdate(leaveDataOrg._id, leaveDataOrg)
        .then((leave) => {
        })
        .catch(err => res.status(400).json('Error: ' + err));
    const temp = {
        "username": leaveDataOrg.admin,
        "empCd": leaveDataOrg.empCd
    };
    leaveDataOrg.date.year = +leaveDataOrg.date.year;
    leaveDataOrg.date.month = +leaveDataOrg.date.month;
    leaveDataOrg.date.date = +leaveDataOrg.date.date;
    Employee.find(temp)
        .then(async (employee) => {
            employee = employee[0];
            for (let i = 1; i <= leaveDataOrg.days; i++) {
                let tempData = { ...leaveDataOrg["date"] };
                tempData["date"] += i - 1;
                if (tempData["date"] > noOfDays[tempData["month"]]) {
                    tempData["date"] = tempData["date"] - noOfDays[tempData["month"]];
                    tempData["month"]++;
                }
                if (tempData["month"] > 12) {
                    tempData["month"] = 1;
                    tempData["year"]++;
                }
                const leaveData = await { ...leaveDataOrg };
                leaveData.date = await tempData;
                let found = employee.attendance.find(year => {
                    return +year.value === leaveData.date.year
                });
                if (found === undefined) {
                    let date = new Array(32);
                    date[+leaveData.date.date] = {
                        "isLeave": true
                    };
                    let month = new Array(13);
                    month[+leaveData.date.month] = {
                        value: '' + leaveData.date.month,
                        date: date
                    };
                    let year = {
                        value: '' + leaveData.date.year,
                        month: month
                    };
                    employee.attendance.push(year);
                }
                else {
                    if (found.month[+leaveData.date.month]) {
                        found.month[+leaveData.date.month].date[+leaveData.date.date] = {
                            "isLeave": true
                        }
                    }
                    else {
                        let date = new Array(32);
                        date[+leaveData.date.date] = {
                            "isLeave": true
                        };
                        found.month[+leaveData.date.month] = {
                            value: '' + leaveData.date.month,
                            date: date
                        }
                    }
                }
            }
            Employee.findByIdAndUpdate(employee._id, employee)
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}