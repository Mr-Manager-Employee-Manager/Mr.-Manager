import axios from 'axios';

const url = '/leaveRequest';

export const leaveRequest = (data) => {
    console.log("in leave api");
    axios.post(url,data).then((employee)=>{
        console.log(data);
    })
}
