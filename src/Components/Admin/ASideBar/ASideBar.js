import "./ASideBar.css"
import { NavLink } from "react-router-dom";
import Attendance from '../../../Assets/Dashboard_SVGs/Attendance.svg'
import Dashboard from '../../../Assets/Dashboard_SVGs/Dashboard.svg'
import Employee from '../../../Assets/Dashboard_SVGs/Employee.svg'
import Inventory from '../../../Assets/Dashboard_SVGs/Inventory.svg'
import kiosk from '../../../Assets/Dashboard_SVGs/kiosk.svg'
import logout from '../../../Assets/Dashboard_SVGs/logout.svg'
import Products from '../../../Assets/Dashboard_SVGs/Products.svg'
import Sale_Channel from '../../../Assets/Dashboard_SVGs/Sale_Channel.svg'
import Settings from '../../../Assets/Dashboard_SVGs/Settings.svg'
import FoodPanda from '../../../Assets/Dashboard_SVGs/FoodPanda.svg'
import Kiosk2 from '../../../Assets/Dashboard_SVGs/Kiosk2.svg'
import Online_Sale from '../../../Assets/Dashboard_SVGs/Online_Sale.svg'
import open from '../../../Assets/Images/open.svg'
import close from '../../../Assets/Images/close.svg'
import baskyt from '../../../Assets/Dashboard_SVGs/Baskyt.png'
import bykea from '../../../Assets/Dashboard_SVGs/Bykea.png'
import pandago from '../../../Assets/Dashboard_SVGs/PandaGo.png'
import overalll from '../../../Assets/Dashboard_SVGs/sales.svg'

import React, { useEffect, useState } from 'react'


export default function ASideBar(props) {

    const [channel, setChannel] = useState(false)
    const [rerender, setRerender] = useState(false);


  useEffect(() => {
    //
  }, [rerender])
  


    const logoutHandler = () => {
        localStorage.clear();
        props.setToken('');
        props.setRole('');
        window.location.href="/"
      }

     const channelHandler = () => {
        setChannel(!channel)
      }
    
    
      return (
        <div className="sidebar">
          <div className="sidebarWrapper">
            <div className="sidebarMenu">
              {/* <h3 className="sidebarTitle">Dashboard</h3> */}
              <ul className="sidebarList">
                <NavLink to="/" className="link">
                <li className={window.location.pathname === "/" ? 'sidebarListItem active' : "sidebarListItem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={Dashboard} alt="" />
                    </span>
                    Dashboard
                </li>
                </NavLink>
                <NavLink to="/kiosk" className="link">
                <li className={window.location.pathname === "/kiosk" ? 'sidebarListItem active' : "sidebarListItem"} onClick={()=>{setRerender(!rerender)}} >
                    <span className="ico">
                        <img className="sico" src={kiosk} alt="" />
                    </span>
                  Kiosks
                </li>
                </NavLink>
                <NavLink to="/employee" className="link">
                <li className={window.location.pathname === "/employee" ? 'sidebarListItem active' : "sidebarListItem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={Employee} alt="" />
                    </span>
                  Employees
                </li>
                </NavLink>
                <NavLink to="/attendance" className="link">
                <li className={window.location.pathname === "/attendance" ? 'sidebarListItem active' : "sidebarListItem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={Attendance} alt="" />
                    </span>
                  Attendance
                </li>
                </NavLink>
                {/* <Link to="/salechannel" className="link"> */}
                <li className="sidebarListItem" onClick={channelHandler}>
                    <span className="ico">
                        <img className="sico" src={Sale_Channel} alt="" />
                    </span>
                  Sales Channel 
                  <span className="arrow"><img src={channel ? open : close} alt="" /></span>
                </li>
                {/* </Link> */}


                {channel ? 
                <>
                <NavLink to="/salechannel/kiosk" className="link">
                <li className={window.location.pathname === "/salechannel/kiosk" ? 'sidebarListItem subitem active' : "sidebarListItem subitem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={Kiosk2} alt="" />
                    </span>
                  Kiosk
                </li>
                </NavLink>

                <NavLink to="/salechannel/food_panda" className="link">
                <li className={window.location.pathname === "/salechannel/food_panda" ? 'sidebarListItem subitem active' : "sidebarListItem subitem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={FoodPanda} alt="" />
                    </span>
                  Food Panda
                </li>
                </NavLink>
                <NavLink to="/salechannel/online_store" className="link">
                <li className={window.location.pathname === "/salechannel/online_store" ? 'sidebarListItem subitem active' : "sidebarListItem subitem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={Online_Sale} alt="" />
                    </span>
                  Online Sale
                </li>
                </NavLink>
                {/* <NavLink to="/salechannel/panda_go" className="link">
                <li className={window.location.pathname === "/salechannel/panda_go" ? 'sidebarListItem subitem active' : "sidebarListItem subitem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={pandago} alt="" />
                    </span>
                    Panda go Sale
                </li>
                </NavLink>
                <NavLink to="/salechannel/basket" className="link">
                <li className={window.location.pathname === "/salechannel/basket" ? 'sidebarListItem subitem active' : "sidebarListItem subitem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={baskyt} alt="" />
                    </span>
                    Basket Sale
                </li>
                </NavLink>
                <NavLink to="/salechannel/bykea" className="link">
                <li className={window.location.pathname === "/salechannel/bykea" ? 'sidebarListItem subitem active' : "sidebarListItem subitem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={bykea} alt="" />
                    </span>
                    Bykea Sale
                </li>
                </NavLink> */}
                <NavLink to="/salechannel/overall" className="link">
                <li className={window.location.pathname === "/salechannel/overall" ? 'sidebarListItem subitem active' : "sidebarListItem subitem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={overalll} alt="" />
                    </span>
                  Overall Sales
                </li>
                </NavLink>
                </>
                :
                ''
                
            } 



                <NavLink to="/inventory/fixed" className="link">
                <li className={window.location.pathname === "/inventory/fixed" ? 'sidebarListItem active' : "sidebarListItem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={Inventory} alt="" />
                    </span>
                  Inventory
                  
                </li>
                </NavLink>

                <NavLink to="/inventory" className="link">
                <li className={window.location.pathname === "/inventory" ? 'sidebarListItem active' : "sidebarListItem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={Inventory} alt="" />
                    </span>
                  Accessories
                  
                </li>
                </NavLink>

                <NavLink to="/inventory/requestable" className="link">
                <li className={window.location.pathname === "/inventory/requestable" ? 'sidebarListItem active' : "sidebarListItem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={Inventory} alt="" />
                    </span>
                  Requestable Accessories
                  
                </li>
                </NavLink>
                
                <NavLink to="/inventory/requested" className="link">
                <li className={window.location.pathname === "/inventory/requested" ? 'sidebarListItem active' : "sidebarListItem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={Inventory} alt="" />
                    </span>
                    Accessories Request
                  
                </li>
                </NavLink>


                <NavLink to="/products" className="link">
                <li className={window.location.pathname === "/products" ? 'sidebarListItem active' : "sidebarListItem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={Products} alt="" />
                    </span>
                  Products
                </li>
                </NavLink>
                <NavLink to="/settings" className="link">
                <li className={window.location.pathname === "/settings" ? 'sidebarListItem active' : "sidebarListItem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={Settings} alt="" />
                    </span>
                  Settings
                </li>
                </NavLink>
                {/* <Link to="/" className="link"> */}
                <li onClick={logoutHandler} className="sidebarListItem" style={{
                  minWidth: '265px',
                  maxWidth: '14vw',
                  marginTop: '20vh',
                  backgroundColor: '#FF8AA5',
                  color: 'white',
                }}>
                    <span className="ico">
                        <img className="sico" src={logout} alt="" />
                    </span>
                  Log out
                </li>
                {/* </Link> */}
               
              </ul>
            </div>
            
          </div>
        </div>
      )
}
