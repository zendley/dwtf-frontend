import "./Settings.css";
import React, { useEffect, useState } from 'react'

import axios from '../../../Api/Axios';
import * as axiosURL from '../../../Api/AxiosUrls';

import { Modal, Button, Form } from "react-bootstrap";

var tok = localStorage.getItem('token')
var token = 'Bearer ' + tok;

var Url = axiosURL.ChangePass;
var batchprice = axiosURL.getBatchPrice;
var changebatch = axiosURL.ChangeBatchPrice;


export default function Settings() {
  const[batch_12,setBatch12] = useState('Not set');
  const[batch_9,setBatch9] = useState('Not set');
  const[batch_6,setBatch6] = useState('Not set');
  const[bag,setBag] = useState('Not set');
  
  const[isBatchOpen,setBatchOpen] = useState(false);
  const[batchpricetext,setBatchPriceText] =useState();
  const[batchtext,setBatchText] =useState();

  const [editdata,setEditData] =useState([]);

  // editdata.price ='test'

  useEffect(() => {
    getBatchPrice();
  },)

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

const handleEditChange = e => {
  const { name, value } = e.target;
  setEditData(prevState => ({
    ...prevState,
    [name]: value
}));
};
const getBatchPrice = async (e) => {

  
  try {
      const response = await axios.get(batchprice,
        {
          headers: {
            'Authorization': token,
          }
        }
        );

        
        
        setBatch12(response.data.data.batch_12)
        setBatch9(response.data.data.batch_9)
        setBatch6(response.data.data.batch_6)
        setBag(response.data.data.bag)


  } catch (err) {
    
    
  }

  
}



const handleFormSubmitBatach = e =>{
  // e.preventDefault();
  const url = changebatch
  // let test['text'] =batchpricetext
  axios.post(url, {
    'name' : batchpricetext,
    'price': editdata.price,
    
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
        
        alert(response.data.message)
        setBatchOpen(false)
      }
  })
}

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
      <div className="main" style={{paddingLeft:"50px"}}>

        <h4 style={{color: '#463B3B'}}>
          Settings
        </h4>

        {/* <p style={{color: '#463B3B'}}>
          Admin Settings
        </p> */}
        <div className="d-flex flex-column">

        <div className="card2 m-2" style={{height:'fit-content'}}>
          <p>Change Password</p>
          <form className="Sform" style={{textAlign:'start',marginLeft:'25px'}} onSubmit={handleFormSubmit}>
            <label htmlFor="email" >Email*</label>
            <input type="text" className="form-control inpp" placeholder="example@gmail.com" name="email" onChange={handleFormChange} value={form.email}/>
            <label htmlFor="pass">New Password*</label>
            <input type="text" className="form-control inpp" placeholder="12345678" name="pass" onChange={handleFormChange} value={form.pass}/>
            <label htmlFor="cpass">Confirm Password*</label>
            <input type="text" className="form-control inpp" placeholder="12345678" name="cpass" onChange={handleFormChange} value={form.cpass}/>
            <div className="d-flex justify-content-center"><button className="butto">Update</button></div>
            
          </form>
        </div>

        <div className="card2 m-2">
        <p>Batch Price</p>
          <div className="Sform">
            {/* <input type="text" className="form-control inpp" placeholder="Batch of 12" name="batch12" onChange={handleFormChange} />
            <input type="text" className="form-control inpp" placeholder="Batch of 9" name="batch9" onChange={handleFormChange} />
            <input type="text" className="form-control inpp" placeholder="Batch of 6" name="batch6" onChange={handleFormChange} />
            <input type="text" className="form-control inpp" placeholder="Bag price" name="bag" onChange={handleFormChange} /> */}

            <div className="row" style={{marginTop:'10px'}}>
              <div className="col-4">
                Batch of 12
              </div>
              <div className="col-5 border"> {batch_12}</div>
              <div className="col-3"><button className="editButton" onClick={()=>{setBatchOpen(true);setBatchPriceText('batch_12');setBatchText('Batch of 12 Price');setEditData(prevState => ({
        ...prevState,price:batch_12}));}}>Edit Price</button></div>
            </div>
            <div className="row" style={{marginTop:'10px'}}>
              <div className="col-4">
                Batch of 9
              </div>
              <div className="col-5 border"> {batch_9}</div>
              <div className="col-3"><button className="editButton" onClick={()=>{setBatchOpen(true);setBatchPriceText('batch_9');setBatchText('Batch of 9 Price');setEditData(prevState => ({
        ...prevState,price:batch_9}));}}>Edit Price</button></div>
            </div>
            <div className="row" style={{marginTop:'10px'}}>
              <div className="col-4">
                Batch of 6
              </div>
              <div className="col-5 border">{batch_6}</div>
              <div className="col-3"><button className="editButton" onClick={()=>{setBatchOpen(true);setBatchPriceText('batch_6');setBatchText('Batch of 6 Price');setEditData(prevState => ({
        ...prevState,price:batch_6}));}}>Edit Price</button></div>
            </div>

            {/* <button className="butto">Submit</button> */}
          </div>

          <p style={{marginTop:'10px'}} >Bag Price</p>
          {/* <div className="bg-danger" style={{marginLeft:'20px',}}>  */}
          <div className="row" style={{marginTop:'10px',}}>
                  <div className="col-4" style={{paddingLeft:'30px'}}>
                    Bag Price
                  </div>
                  <div className="col-5 border text-center">{bag}</div>
                  <div className="col-3"><button className="editButton" onClick={()=>{setBatchOpen(true);setBatchPriceText('bag');setBatchText('Single Bag Price');setEditData(prevState => ({
            ...prevState,price:bag}));}}>Edit Price</button></div>
                </div>
          {/* </div> */}
              
        </div>

        
       <Modal
      show={isBatchOpen}
      onHide={()=>{setBatchOpen(false)}}
      // size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      
      >
      {/* <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
      <Form>
          <Form.Group className="mb-3"  controlId="exampleForm.ControlInput1">
            <div className="row">
              <div className="col-4 text-center my-auto">
                <Form.Label>{isBatchOpen?batchtext:''}</Form.Label>
                </div>
              <div className="col-8">
                <Form.Control
                value={editdata.price}
                name="price"
                type="text"
                onChange={handleEditChange}
                className="text-center"
                />
            </div>
            </div>
            
            
          </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={()=>{setBatchOpen(false)}}>Close</Button> */}
        <Button style={{backgroundColor: '#FF8AA5', border:'none'}} onClick={()=>{handleFormSubmitBatach()}} >Update</Button>
      </Modal.Footer>
    </Modal> 

        </div>

        

      </div>
    </>
  )
}
