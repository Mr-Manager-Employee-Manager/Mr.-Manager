import axios from 'axios';

const url = '/leave/';

export const leaveRequest = (data) => {
    // console.log("in leave api");
    axios.post(url + 'request',data).then((employee)=>{
        console.log("leave appliedass");
    })
}

export const markLeave = (data) => {
    // console.log("in leave api");
    axios.post(url + 'mark',data).then((employee)=>{
        console.log("leave marked");
    })
}

export const declineLeave = (data) => {
    // console.log("in leave api");
    axios.post(url + 'decline',data).then(() =>{
        console.log("leave declined");
    })
}
