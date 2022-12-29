import "./Index.css"
import ll2 from '../../../Assets/Images/loginlogo.png';
import { Link } from "react-router-dom";


import React from 'react'

export default function Index() {
  return (
    <>
    <div className="row">

      <div className="col-6 left">
          <img style={{height: '100vh',}} src={ll2} alt="" />
      </div>

      <div className="col-6 right">
          <h2 className="my-4">Welcome To Dashboard</h2>

          <div className="card">
            
         <Link to='login'>
          <button className="button2">Sign In</button>
         </Link>
          {/* <Link to="/">
            <button  className="button3">Register</button>
          </Link> */}

          </div>

            <p className="bottom">© Design & developed by SpeckPro Digital</p>
          
      </div>

    </div>
  </>
  )
}
