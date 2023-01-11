import "./Settings.css";
import React, { useState } from 'react';

import axios from '../../../Api/Axios';
import * as axiosURL from '../../../Api/AxiosUrls';

var tok = localStorage.getItem('token')
var token = 'Bearer ' + tok;

var Url = axiosURL.ChangePass;

export default function Settings() {


  const [form, setForm] = useState({
    email: '',
    pass: '',
    cpass: ''
  })

  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
  }));
};

const handleFormSubmit = e => {

  e.preventDefault();

  if(form.email === '' || form.pass === '' || form.cpass === '')
  {
    alert("All Fields are Requied!")
  }
  else if(form.pass !== form.cpass)
  {
    alert('Your password does not match!')
  }
  else
  {
    const url = Url
    axios.post(url, {
      email: form.email,
      pass: form.pass
    },
    {
        headers: {
          'Authorization': token,
        }
    }
    )
    .then(response=>{
        if(response.status !== 200)
        {
            alert(response.status)
        }
        else
        {   
            setForm({
              email: '',
              pass: '',
              cpass: ''
            });
            alert(response.data.message)
            // setRerender(!rerender); 
        }
    })
  }
  
};

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
          <form className="Sform" onSubmit={handleFormSubmit}>
            <input type="text" className="form-control inpp" placeholder="Confirm Email" name="email" onChange={handleFormChange} value={form.email}/>
            <input type="text" className="form-control inpp" placeholder="Password" name="pass" onChange={handleFormChange} value={form.pass}/>
            <input type="text" className="form-control inpp" placeholder="Confirm Password" name="cpass" onChange={handleFormChange} value={form.cpass}/>

            <button className="butto">Submit</button>
          </form>
        </div>

      </div>
    </>
  )
}
