import Leave from '../models/Leave.js';

export const leaveRequest = (req, res) => {
    const leaveReq = req.body;
    console.log(leaveReq);
    const newLeaveRequest = new Leave(leaveReq);
    newLeaveRequest.save()
        .then(() => res.status(200).json(leaveReq))
        .catch(err => res.status(400).json('Error: ' + err));
}
export const getLeaves=(req,res)=>{
    console.log(req.params);
    Leave.find({"admin":req.params.id}).then(leaves=>{
        res.status(200).json(leaves);
    }).catch(err=>{
        console.log(err);
    })
    
    // const newLeaveRequest = new Leave(leaveReq);
    // newLeaveRequest.save()
    //     .then(() => res.json(leaveReq))
    //     .catch(err => res.status(400).json('Error: ' + err));
}