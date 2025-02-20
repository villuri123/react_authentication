import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ShowValidation from '../components/ShowValidation';
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let [showValidation, setShowValidation] = useState({ content: "", type: "" })
    const navigate = useNavigate();
    const handleClick = async () => {
        if (!email) {
          setShowValidation({ content: "Please enter email!"});
          return false;
        }
        if (!password) {
            setShowValidation({ content: "Please enter password!"});
            return;
        }
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            const response = await axios.post('http://localhost:8080/user-login', formData);
            if (response.data.success) {
                localStorage.setItem("token",response.data.token);
                setShowValidation({ content: response.data.message, type: "success" });
                setTimeout(() => {
                    navigate('/home');
                  }, 1000);
            }else{
                setShowValidation({ content: response.data.message});
            }
        } catch (error) {
            alert(error);
        }
    };
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
      <h3 className="text-center mb-4">Login</h3>
      <div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className='d-flex justify-content-between mb-2'>
        <Link to={"forgot-password"}>Forgot Password</Link>
        <Link to={"register"}>Register</Link>
        </div>
        
        <button type="submit" className="btn btn-primary w-100" onClick={handleClick}>Login</button>
      </div>
    </div>
    <ShowValidation content={showValidation.content} type={showValidation.type} />
  </div>
  )
}

export default Login