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
        axios.get('leaves/' + localStorage.getItem('username')).then(res => {
            setLoading(false);
            setLeaves(res.data);
        })
            .catch(error => {
                props.history.push('/');
            })
    }, [])
    const renderingLeaves = leaves.map((el, id) => {
        return el.status === "pending" ? <Leave setLeaves={() => setLeaves()} data={el} key={id} /> : null;
    });
    return (
        <>
            {renderingLeaves}
        </>
    )
}
export default withRouter(Notification);