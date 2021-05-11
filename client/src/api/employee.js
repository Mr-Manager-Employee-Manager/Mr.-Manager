import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const url = '/employees';

export const fetchPosts = (obj, filterEmployee) => {
    for (const prop in obj) {
        if (obj[prop] === "") {
            delete obj[prop];
        }
    }
    axios.post(url,obj).then((employee)=>{
        filterEmployee(employee.data);
    })
}
export const createPost = (newPost) => {
    axios({
        method: 'POST',
        url: url + '/add',
        data: newPost
    }).then((res) => {
        if(res.data === "Employee already exists")
        {
            toast.warn('Employee with such Employee Code already exists', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else
        {
            toast.success('Employee successfully added', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        console.log(res.data);
    })
        .catch((err) => {
            console.log(err);
        })
};
export const editPost = (editedPost, id,props) => {
    axios({
        method: 'POST',
        url: url + '/' + id + '/edit',
        data: editedPost
    }).then(() => {
        console.log('Data updated');
        props.history.push({pathname:"/employees",data:"Employee successfully edited!"})

    })
        .catch((err) => {
            props.history.push('/');
        })
}
export const deletePost = (id,props) => {
    axios.delete(url + '/' + id).then(() => {
        console.log("delete successful!");
        props.history.push({pathname:"/employees",data:"Employee deleted successfully!"})
    })
    toast.success('Employee successfully deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}