import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Home() {
    let i =1;
    const navigate = useNavigate();
    let token = localStorage.getItem("token");
    if(!token){
        navigate("/");
    }
    const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/user-list")
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-light'>
        <table className="table table-striped w-75">
  <thead>
    <tr>
      <th scope="col">SNO</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile</th>
    </tr>
   
  </thead>
  <tbody>
  {users.map(user => (
            <tr>
            <th scope="col">{i++}</th>
            <th scope="col">{user.name}</th>
            <th scope="col">{user.email}</th>
            <th scope="col">{user.mobile}</th>
          </tr>
          ))}
  </tbody>
</table>
    </div>
  )
}

export default Home