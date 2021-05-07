import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router';
import Leave from './Leaves/Leave';

const Notification = (props) => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('leaves/'+localStorage.getItem('username')).then(res => {
            setLoading(false);
            console.log(leaves);
            setLeaves(res.data);

        })
            .catch(error => {
                props.history.push('/');
            })

        // eslint-disable-next-line


    }, [])
    const renderingLeaves=leaves.map((el,id)=>(
        <Leave data={el} key={id}/>
    ));
    return (
        <div>
            {renderingLeaves}
        </div>
    )
}
export default withRouter(Notification);