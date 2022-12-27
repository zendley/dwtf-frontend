import React from 'react'
import "./Sidebar.css";
import { NavLink, useHistory ,useLocation } from "react-router-dom";

import Dashboard from '../../../Assets/Dashboard_SVGs/Dashboard.svg'
import Percentage from '../../../Assets/Dashboard_SVGs/discount.svg'
import History from '../../../Assets/Dashboard_SVGs/history.svg'
import Notifications from '../../../Assets/Dashboard_SVGs/notification.svg'
import logout from '../../../Assets/Dashboard_SVGs/logout.svg'
import livestatus from '../../../Assets/Dashboard_SVGs/livestatus.svg'



export default function Sidebar(props) {
  
  const location = useLocation()

  const logoutHandler = () => {
    localStorage.clear();
    props.setToken('');
    props.setRole('');
    
    window.location.href="/"
  }


  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          {/* <h3 className="sidebarTitle">Dashboard</h3> */}
          <ul className="sidebarList">
            <NavLink to="/" className="link">
            <li className={window.location.pathname === "/" ? 'sidebarListItem active' : "sidebarListItem"}>
                <span className="ico">
                    <img className="sico" src={Dashboard} alt="" />
                </span>
              Dashboard
            </li>
            </NavLink>
            <NavLink to="/live_status" className="link">
            <li className={window.location.pathname === "/live_status" ? 'sidebarListItem active' : "sidebarListItem"}>
                <span className="ico">
                    <img className="sico" src={livestatus} alt="" />
                </span>
              Live Status
            </li>
            </NavLink>
            <NavLink to="/set_percentage" className="link" >
            <li  className={window.location.pathname === "/set_percentage" ? 'sidebarListItem active' : "sidebarListItem"}>
                <span className="ico">
                    <img className="sico" src={Percentage} alt="" />
                </span>
              Set percentage
            </li>
            </NavLink>
            <NavLink to="/history"  className="link">
            <li className={window.location.pathname === "/history" ? 'sidebarListItem active' : "sidebarListItem"}>
                <span className="ico">
                    <img className="sico" src={History} alt="" />
                </span>
              History
            </li>
            </NavLink>
            <NavLink to="/notifications" className="link">
            <li className={window.location.pathname === "/notifications" ? 'sidebarListItem active' : "sidebarListItem"}>
                <span className="ico">
                    <img className="sico" src={Notifications} alt="" />
                </span>
              Notifications
            </li>
            </NavLink>
            {/* <Link to="/" className="link"> */}
            <li onClick={logoutHandler} className="sidebarListItem" style={{
              minWidth: '265px',
              maxWidth: '14vw',
              marginTop: '45vh',
              backgroundColor: '#FF8AA5',
              color: 'white',
            }}>
                <span className="ico">
                    <img className="sico" src={logout} alt="" />
                </span>
              Logout
            </li>
            {/* </Link> */}
           
          </ul>
        </div>
        
      </div>
    </div>
  )
}
