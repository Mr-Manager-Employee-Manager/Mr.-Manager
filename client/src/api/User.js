import axios from 'axios';

// const url = 'http://localhost:5000/';
const url = '/';

export const deletePost = (id) => {
    axios.delete(url + '/' + id).then(() => {
        console.log("delete successful!");
        window.location = '/view';
    })
}

export const getUser= (event)=>{
    event.preventDefault();
    console.log("in");
    axios({
      method:"get",
      withCredentials:true,
      url:"/user"
    }).then((res)=>{
      console.log("will show the user");
    })
    .catch(err => console.log(err));
  };