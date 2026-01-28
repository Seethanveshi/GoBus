import React, { useState } from 'react'
import api from '../../api/axios'
import {useNavigate } from 'react-router'
import "../../styles/Auth.css"

function Signup() {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSignUp = async() => {
        if (!userName || !email || !password) {
            alert("All fields are required");
            return;
        }

        try {
            const res = await api.post("/auth/signup", {
                                                "user_name" : userName,
                                                "email" : email,
                                                "password" : password,    
                                            }
                            )
            navigate("/auth/login")
        } catch (error) {
            console.error(error)
            alert("SignUp failed")
        }
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <h2>Create Account</h2>
                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    <input 
                        className="auth-input"
                        type="text"
                        placeholder='User Name'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input 
                        className="auth-input"
                        type="email" 
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        className="auth-input"
                        type="password" 
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="auth-button" onClick={handleSignUp} type="submit">Sign Up</button>
                </form>
                <div className="auth-footer">
                    Already have an account? <span className="auth-link" onClick={() => navigate('/auth/login')}>Login</span>
                </div>
            </div>
        </div>
    )
}

export default Signup