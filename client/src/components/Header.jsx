import React from 'react';
import '../styles/Header.css';
import { Menu, X, HelpCircle, User } from "lucide-react";

function Header() {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <img 
              src="/GoBus_Logo.png" 
              alt="GoBus Logo" 
            />
          </div>
        </div>

        <nav className="header-nav">
          <div className="nav-item active">
            <div className="nav-icon">
              <img 
                src="/GoBus_Logo.png" 
                alt="GoBus Logo" 
              />
            </div>
            <span>Bus Tickets</span>
          </div>
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
          <div className="right-item">
            <i className="icon-bookings">
                <Menu />
            </i>
            <span>Bookings</span>
          </div>
          <div className="right-item">
            <i className="icon-help">
              <HelpCircle />
            </i>
            <span>Help</span>
          </div>
          <div className="right-item account-menu">
            <i className="icon-account">
              <User />
            </i>
            <span>Account</span>
            <i className="arrow-down"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;