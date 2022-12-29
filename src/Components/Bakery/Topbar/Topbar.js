import React from 'react'
import logo from '../../../Assets/Images/Logo.png'
import "./Topbar.css"

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          {/* <span className="logo"> */}
            <img src={logo} alt="DWF" />
          {/* </span> */}
        </div>
        {/* <div className="topRight">
          <div className="topbarIconContainer">
            1
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            Staff
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div> */}
      </div>
    </div>
  )
}
