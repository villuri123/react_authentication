import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ShowValidation from '../components/ShowValidation';
function ChangePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    let [showValidation, setShowValidation] = useState({ content: "", type: "" })
    const navigate = useNavigate();
    const handleClick = async () => {
        let userId = localStorage.getItem("forgotUserId");
        if (!userId) {
            setShowValidation({ content: "Invalid request!" });
            return false;
        }
        if (!password) {
            setShowValidation({ content: "Please new password!" });
            return false;
        }
        if (!confirmPassword) {
            setShowValidation({ content: "Please enter confirm password!" });
            return false;
        }
        if (!(password == confirmPassword)) {
            setShowValidation({ content: "Password does not match!" });
            return false;
        }
        try {
            const formData = new FormData();
            formData.append('newPassword', password);
            formData.append('confirmPassword', confirmPassword);
            formData.append('userId', userId);
            const response = await axios.post('http://localhost:8080/change-password', formData);
            console.log(response.data)
            if (response.data.success) {
                setShowValidation({ content: response.data.message, type: "success" });
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                setShowValidation({ content: response.data.message });
            }
        } catch (error) {
            setShowValidation({ content: error });
            return false;
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
                <h3 className="text-center mb-4">Change Password</h3>
                <div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="new_password">New Password</label>
                        <input type="text" className="form-control" id="new_password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="confirm_password">Confirm Password</label>
                        <input type="text" className="form-control" id="confirm_password" placeholder="Enter confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className='text-center mb-2'>
                        <Link to={"/"} className='text-decoration-none'>Login</Link>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" onClick={handleClick}>Update Password</button>
                </div>
            </div>
            <ShowValidation content={showValidation.content} type={showValidation.type} />
        </div>
    )
}

export default ChangePassword