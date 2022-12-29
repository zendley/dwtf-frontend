import "./ATopBar.css"

import React, { useState } from 'react'

import logo from '../../../Assets/Images/Logo.png'
import Notifications from '../../../Assets/Dashboard_SVGs/notification.svg'
import loaderr from '../../../Assets/Dashboard_SVGs/loader.gif'
import nodatafound from '../../../Assets/Dashboard_SVGs/NoContentFound.svg'

import { Link } from "react-router-dom";

import axios from '../../../Api/Axios';
import * as axiosURL from '../../../Api/AxiosUrls';

var Admin_Notification = axiosURL.Admin_Notifications;
var tok = localStorage.getItem('token')
var token = 'Bearer ' + tok;


export default function ATopBar() {


  const [notiisopen, setNotiIsOpen] = useState(false)
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState([])

  const getNoti = () => {
    setLoader(true);

    const url = Admin_Notification
        axios.get(url,
        {
            headers: {
              'Authorization': token,
            }
        }
        )
        .then(response=>{
            if(response.status !== 200)
            {
                alert("Error", response.status)
            }
            else
            {   
                setData(response.data);
                setLoader(false);
                

                console.log(response.data)

                
            }
        })
  }

    return (
        <div className="topbar">
          <div className="topbarWrapper">
            <div className="topLeft">
              {/* <span className="logo"> */}
                <img src={logo} alt="DWF" />
              {/* </span> */}
            </div>
            <div className="topRight">
              {/* <div className="topbarIconContainer">
                1
                <span className="topIconBadge">2</span>
              </div> */}
              <div className="topbarIconContainer">
                <Link
                onClick={()=>{ getNoti(); notiisopen === true ? setNotiIsOpen(false) : setNotiIsOpen(true);}}
                >
                  <img style={{width: '25px', marginRight: '10px',}} src={Notifications} alt="" />
                </Link>
              </div>
              {/* <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" /> */}
            </div>
          </div>


              {/* NOTIFICATIONS BOX */}

              
                {notiisopen === true ?  
                
                <div style={{
                  width: '200px',
                  height: '240px',
                  position: 'relative',
                  left: '85%',
                  background: 'white',
                  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                  padding: '15px',
                }}>

                {loader === true ?
                <div style={{
                  height: '100%',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <img style={{width: '50px', height: '50px',}} src={loaderr} alt="" />
                </div>
                :

                data.length < 1
                ?
                <div style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <img style={{width: '170px', height: '170px',}} src={nodatafound} alt="" />
                </div>
                :

                data.map((tabl, index)=>{
                  return(
                <div>
                  <p
                  style={{
                    marginBottom: '0px',
                  }}
                  >New Inventory Request</p>
                  <p
                  style={{
                    marginBottom: '0px',
                    fontSize: '9px',
                    color: 'gray',
                  }}
                  >{tabl.date}</p>
                  <hr style={{margin: '0.3rem 0',}} />
                </div>
                  
                  );
                })}
                
                



              </div>



              :
               ""
                
                }
              

              {/* <div style={{
                width: '200px',
                height: '240px',
                position: 'relative',
                left: '85%',
                background: 'white',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                padding: '15px',
              }}>

                <div>
                  <p
                  style={{
                    marginBottom: '0px',
                  }}
                  >Hello</p>
                  <p
                  style={{
                    marginBottom: '0px',
                    fontSize: '9px',
                    color: 'gray',
                  }}
                  >25-10-2022</p>
                  <hr style={{margin: '0.3rem 0',}} />
                </div>



              </div> */}


        </div>
      )
}
