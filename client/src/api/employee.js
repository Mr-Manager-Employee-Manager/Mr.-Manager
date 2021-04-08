import axios from 'axios';

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
    }).then(() => {
        console.log('Data send');
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
    //console.log('will delete!');
}