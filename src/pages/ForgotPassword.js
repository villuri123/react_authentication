import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ShowValidation from '../components/ShowValidation';
function ForgotPassword() {
    const [email, setEmail] = useState("");
    let [showValidation, setShowValidation] = useState({ content: "", type: "" })
    const navigate = useNavigate();
    const handleClick = async () => {
        if (!email) {
            setShowValidation({ content: "Please enter email!"});
            return false;
        }
        try {
            const formData = new FormData();
            formData.append('email', email);
            const response = await axios.post('http://localhost:8080/forgot-password', formData);
            if (response.data.success) {
                console.log(response.data)
                localStorage.setItem("forgotUserId",response.data.userId);
                localStorage.setItem("otp",response.data.otp)
                setShowValidation({ content: response.data.message, type: "success" });
                setTimeout(() => {
                    navigate('/verify-otp');
                  }, 1000);
            }else{
                setShowValidation({ content: response.data.message});
            }
        } catch (error) {
            setShowValidation({ content: error});
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
      <h3 className="text-center mb-4">Forgot Password</h3>
      <div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className='text-center mb-2'>
        <Link to={"/"} className='text-decoration-none'>Login</Link>
        </div>
        <button type="submit" className="btn btn-primary w-100" onClick={handleClick}>Forgot Password</button>
      </div>
    </div>
    <ShowValidation content={showValidation.content} type={showValidation.type} />
  </div>
  )
}

export default ForgotPassword