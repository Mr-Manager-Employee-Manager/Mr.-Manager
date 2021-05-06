import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router';

const Notification = (props) => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('leaves/'+localStorage.getItem('username')).then(res => {
            setLoading(false);
            console.log(res);
            setLeaves(res);

        })
            .catch(error => {
                props.history.push('/');
            })

        // eslint-disable-next-line


    }, [])
    return (
        <div>
            {console.log(leaves)}
        </div>
    )
}
export default withRouter(Notification);