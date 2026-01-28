import React from 'react';
import '../styles/Header.css';
import { Menu, X, HelpCircle, User, ChevronDown } from "lucide-react";
import { NavLink, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/AuthSlice';

function Header() {
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        navigate("/auth/login")
    }

    return (
      <header className="main-header">
        <div className="header-container">
          <div className="header-left">
            <NavLink to="/" >
              <div className="logo">
                <img 
                  src="/GoBus_Logo.png" 
                  alt="GoBus Logo" 
                />
              </div>
            </NavLink>
          </div>

          <nav className="header-nav">
            <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
              <div className="nav-icon">
                <img 
                  src="/GoBus_Logo.png" 
                  alt="GoBus Logo" 
                />
              </div>
              <span>Bus Tickets</span>
            </NavLink>
            <div className="nav-item">
              <div className="nav-icon">
                <img 
                  src="/GoBus_Logo.png" 
                  alt="GoBus Logo" 
                />
              </div>
              <span>Tour Tickets</span>
            </div>
          </nav>

          <div className="header-right">
            <NavLink to="/bookings/history" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
                <div className="right-item">
                  <i className="icon-bookings">
                      <Menu />
                  </i>
                  <div>Bookings</div>
                </div>
              </NavLink>
            <div className="right-item">
              <i className="icon-help">
                <HelpCircle />
              </i>
              <span>Help</span>
            </div>
            <div className="right-item account-menu">
              <User size={20} />
              
              {user == null ? (
                <div className="auth-buttons">
                  <span className="auth-btn" onClick={() => navigate("/auth/login")}>Login</span>
                  <span className="auth-divider">|</span>
                  <span className="auth-btn" onClick={() => navigate("/auth/signup")}>SignUp</span>
                </div>
              ) : (
                <div className="user-logged-in">
                  <span className="user-name">{user.user_name}</span>
                  <button className="logout-link-btn" onClick={handleLogout}>Logout</button>
                </div>
              )}
            
            </div>
          </div>
        </div>
      </header>
    );
};

export default Header;