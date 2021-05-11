import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Leave from './LeaveCard/LeaveCard';
toast.configure();
const Notification = (props) => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const data = {
            "admin": localStorage.getItem('username'),
            "empCd": localStorage.getItem('empID')
        }
        console.log(data);
        axios.post('markedLeaves/', data).then(res => {
            console.log(res.data);
            setLoading(false);
            setLeaves(res.data);
        })
        .catch(error => {
              props.history.push('/');
        })
    }, [])
    const renderingLeaves = leaves.map((el, id) => {
        return <Leave data={el} key={id} />;
    });
    return (
        <div style={{ marginTop: "90px" }}>
            {renderingLeaves}
        </div>
    )
}
export default withRouter(Notification);