import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';
import ShowValidation from '../components/ShowValidation';
function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    let [showValidation, setShowValidation] = useState({ content: "", type: "" })
    const navigate = useNavigate();
    const handleClick= async()=>{
        if(!name){
            setShowValidation({ content: "Please enter name!"});
            return false;
        }
        if(!email){
            setShowValidation({ content: "Please enter email!"});
            return false;
        }
        if(!mobile){
            setShowValidation({ content: "Please enter mobile number!"});
            return false;
        }
        if(!password){
            setShowValidation({ content: "Please enter password!"});
            return false;
        }
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('mobile', mobile);
            formData.append('password', password);
            const response = await axios.post('http://localhost:8080/user-register', formData);
            if (response.data.success) {
                setShowValidation({ content: response.data.message, type: "success" });
                setTimeout(() => {
                    navigate('/');
                  }, 1000);
            }else{
              setShowValidation({ content: response.data.message});
            }
        } catch (error) {
            alert(error);
        }
    }
    useEffect(() => {
          if (showValidation.content) {
            const timer = setTimeout(() => {
              setShowValidation({ content: "", type: "" });
            }, 2000);
            return () => clearTimeout(timer);
          }
        }, [showValidation.content]);
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
    <div className="p-4 shadow login_width">
      <h3 className="text-center mb-4">Register</h3>
      <div>
      <div className="mb-3">
          <label className="form-label" htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="mobile">Mobile</label>
          <input type="email" className="form-control" id="mobile" placeholder="Enter mobile"  value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className='d-flex justify-content-between mb-2'>
          <Link to={'/forgot-password'}>Forgot Password</Link>
          <Link to={'/'}>Login</Link>
          </div>
        <button type="submit" className="btn btn-primary w-100" onClick={handleClick}>Register</button>
      </div>
    </div>
    <ShowValidation content={showValidation.content} type={showValidation.type} />
  </div>
  )
}

export default Register