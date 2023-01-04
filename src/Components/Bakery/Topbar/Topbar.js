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
        <div className="topRight">
          <h4 style={
            {
              margin: '0px',
              marginLeft: '18px',
              color: '#463b3b',
            }
          }>Bakery</h4>
        </div>
      </div>
    </div>
  )
}
