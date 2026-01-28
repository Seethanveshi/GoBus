import React, { useState } from 'react'
import api from '../../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/AuthSlice'
import { useLocation, useNavigate } from 'react-router'
import "../../styles/Auth.css"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"

    const handleLogin = async () => {
        try {
            const res = await api.post("/auth/login", {
                                            "email" : email,
                                            "password" : password 
                                       } 
                            )
            const data = res.data
            dispatch(login(data))
            navigate(from, {replace: true})

        } catch (error) {
            console.error(error)
            alert(error.response?.data?.error || "Login failed");
        }

    }

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <h2>Login to GoBus</h2>
                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
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
                    <button className="auth-button" onClick={handleLogin} type="submit">Login</button>
                </form>
                <div className="auth-footer">
                    Don't have an account? <span className="auth-link" onClick={() => navigate('/auth/signup')}>Sign Up</span>
                </div>
            </div>
        </div>
    )
}

export default Login