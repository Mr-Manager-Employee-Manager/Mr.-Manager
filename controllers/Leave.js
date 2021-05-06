import Leave from '../models/Leave.js';

export const leaveRequest = (req, res) => {
    const leaveReq = req.body;
    console.log(leaveReq);
    // const newLeaveRequest = new Leave(leaveReq);
    // newLeaveRequest.save()
    //     .then(() => res.json(leaveReq))
    //     .catch(err => res.status(400).json('Error: ' + err));
}