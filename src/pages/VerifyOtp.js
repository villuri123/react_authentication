import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ShowValidation from '../components/ShowValidation';
function VerifyOtp() {
    const [otp, setOtp] = useState("");
    let [showValidation, setShowValidation] = useState({ content: "", type: "" })
    const navigate = useNavigate();
    const handleClick = async () => {
        let userId = localStorage.getItem("forgotUserId");
        if (!userId) {
            setShowValidation({ content: "Invalid request!"});
            return false;
        }
        if (!otp) {
            setShowValidation({ content: "Enter otp!"});
            return false;
        }
        try {
            const formData = new FormData();
            formData.append('otp', otp);
            formData.append('userId', userId);
            const response = await axios.post('http://localhost:8080/verify-otp', formData);
            console.log(response.data)
            if (response.data.success) {
                setShowValidation({ content: response.data.message, type: "success" });
                setTimeout(() => {
                    navigate('/change-password');
                  }, 1000);
            }else{
                setShowValidation({ content: response.data.message});
            }
        } catch (error) {
            setShowValidation({ content: error});
            return false
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
      <h3 className="text-center mb-4">Verify OTP</h3>
      <div>
        <div className="mb-3">
          <label className="form-label" htmlFor="otp">OTP</label>
          <input type="text" className="form-control" id="otp" placeholder="Enter otp" value={otp} onChange={(e)=>setOtp(e.target.value)} />
        </div>
        <div className='text-center mb-2'>
        <Link to={"/"} className='text-decoration-none'>Login</Link>
        </div>
        <button type="submit" className="btn btn-primary w-100" onClick={handleClick}>Verify</button>
      </div>
    </div>
    <ShowValidation content={showValidation.content} type={showValidation.type} />
  </div>
  )
}

export default VerifyOtp