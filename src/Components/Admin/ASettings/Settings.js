import "./Settings.css";
import React from 'react';

export default function Settings() {
  return (
    <>
      <div className="main">

        <h4 style={{color: '#463B3B'}}>
          Settings
        </h4>

        <p style={{color: '#463B3B'}}>
          Admin Settings
        </p>

        <div className="card2">
          <form className="Sform">
            <input type="text" className="form-control inpp" placeholder="Confirm Email"/>
            <input type="text" className="form-control inpp" placeholder="Password"/>
            <input type="text" className="form-control inpp" placeholder="Confirm Password"/>

            <button className="butto">Submit</button>
          </form>
        </div>

      </div>
    </>
  )
}
