import React, { useEffect, useState } from 'react'

import axios from '../../../Api/Axios';
import * as axiosURL from '../../../Api/AxiosUrls';

import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

import loader from '../../../Assets/Dashboard_SVGs/loader.gif'
import edit from '../../../Assets/Dashboard_SVGs/editing.svg'
import deletee from '../../../Assets/Dashboard_SVGs/delete.svg'

import { CSVLink } from "react-csv";

var Url = axiosURL.Requestable_get;
var AddUrl = axiosURL.Requestable_add;
var EditUrl = axiosURL.Requestable_edit;
var DeleteUrl = axiosURL.Requestable_delete;
var tok = localStorage.getItem('token')
var token = 'Bearer ' + tok;

export default function RequestableAcc() {




    const [rerender, setRerender] = useState(false);
    const [table, setTable] = useState([])
    const [editisopen, setEditIsOpen] = useState(false)
    const [addisopen, setAddtIsOpen] = useState(false)
    
    const [editdata, setEditData] = useState([]);
    const [editindex, setEditIndex] = useState([]);
    const [adddata, setAddData] = useState([]);
    const [loadermain, setLoaderMain] = useState(true)
  
  
    useEffect(() => {
      getData();
    }, [rerender])
    useEffect(() => {
      //
    }, [editdata])
    
  
  
  
    const getData = async (e) => {
  
      setLoaderMain(true);
      try {
          const response = await axios.get(Url,
            {
              headers: {
                'Authorization': token,
              }
            }
            );
  
            var res = response.data;
  
            setTable(res);
  
          setLoaderMain(false);
          // console.log(response);
  
  
      } catch (err) {
        // if(!err.response){
        //   setErrMsg('No server response');
        // }
        // else if(err.response.status === 400){
        //   setErrMsg('Missing Username or Password');
        // }
        // else if(err.response.status === 401){
        //   setErrMsg('Unauthorized');
        // }
        // else {
        //   setErrMsg('Login Failed');
        // }
  
        // console.log(err);
        
      }
  
      
    }
  
  
    const handleEditChange = e => {
      const { name, value } = e.target;
      setEditData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };
  
  
  const hadleEditModel = (index) => {
  
    setEditData(prevState => ({
      ...prevState,
      IName: table.length !== 0 ? table[index].IName : "",
  }));
  
  setRerender(!rerender);
  setEditIsOpen(true);
  
  
  }
  
  
  const handleAddChange = e => {
    const { name, value } = e.target;
    setAddData(prevState => ({
      ...prevState,
      [name]: value
  }));
  };
  
  
  
  
  
  
  const AddApi = () => {
    // api Logic Here
  
    setLoaderMain(true);
  
    if (adddata.IName === ""){
        alert("Item Name is Required")
    }
    else
    {
  
  
        const url = AddUrl;
        axios.post(url, 
            {
                IName: adddata.IName,
            },
          {
            headers: {
              'Authorization': token,
            }
          }
        )
        .then(response=>{
            if(response.status !== 201)
            {
              // console.log(response.status)
                alert("Error", response.status)
            }
            else
            {   
              // console.log(response.data)
              setAddtIsOpen(false);
              setAddData([]);
              setRerender(!rerender);
            }
        })
    }
  
  }
  
  
  
  const EditApi = (id) => {
    // api Logic Here
  
    setLoaderMain(true);
  
    if (adddata.IName === ""){
      alert("Item Name is Required")
  }
  else
  {
  
      const url = EditUrl + `/${id}`;
      axios.post(url, 
        {
            IName: editdata.IName,
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
            // console.log(response.status)
              alert("Error", response.status)
          }
          else
          {   
            // console.log(response.data)
            setEditIsOpen(false);
            setEditData([]);
            setRerender(!rerender);
          }
      })
  }
  
  }
  
  const handleDeleteApi = (id) => 
  {
  
    setLoaderMain(true);
  
    const url = DeleteUrl + `/${id}`;
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
            setRerender(!rerender);
          }
      })
  }
  
  
  const headers = [
    { label: "Item Name", key: "Item_Name" },
    { label: "Date", key: "Date" },
  ];
  
  const data = table
  
  const csvReport = {
    data: data,
    headers: headers,
    filename: 'Products.csv'
  };
  
  
  
  if(loadermain === true)
        {
            return(
                <>
                    <div
                    style={{
                        position: 'absolute',
                        top: '39vh',
                        left: '53vw',
                    }}
                    >
                        <img src={loader} alt="" />
                    </div>
                </>
            )
        }
        else
        {
  
  
    
    return (
      <>
      <div className="kiosk">
  
      <div className="top">
        <h4 style={{color: '#463B3B'}}>
          Requestable Accessories
        </h4>
        <div className="buttons">
      <CSVLink style={{padding: '6.5px 35px',}} {...csvReport} className="b1">Download</CSVLink>
          <button style={{
            width: "175px",
            marginRight: '18px'
          }} className="b2"><Link style={{all: 'unset', cursor: 'pointer'}} to="/inventory/requestable" onClick={()=>{setAddtIsOpen(true);}} >Add New Item </Link></button>
        </div>
      </div>
  
      <table className="tablee">
    <thead>
      <tr>
        <th>Sr.No</th>
        <th>Item Name</th>
        <th>Date Added</th>
      </tr>
    </thead>
    <tbody>
  
      {table.map((tabl, index)=>{
        return(
        <tr key={tabl.id}>
          <td>{index + 1}</td>
          <td>{tabl.Item_Name}</td>
          <td>{tabl.Date}</td>
          <td>
          <Link style={{all: 'unset', cursor: 'pointer'}} to="/inventory/requestable" onClick={()=>{hadleEditModel(index); setEditIndex(index);}} ><img src={edit} alt="" /> </Link>
              
          <Link style={{all: 'unset', cursor: 'pointer'}} to="/inventory/requestable" onClick={()=>{ if (window.confirm('Are you sure you wish to delete this item?')) handleDeleteApi(tabl.id);}} > <img src={deletee} alt="" /> </Link>
             </td>
        </tr>
        );
      })}
  
      
      
      
    </tbody>
  </table>
      </div>
  
  
  
  
  
      <Modal
        show={addisopen}
        onHide={()=>{setAddtIsOpen(false)}}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                value={adddata.IName}
                name="IName"
                type="text"
                onChange={handleAddChange}
              />
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setAddtIsOpen(false)}}>Close</Button>
          <Button style={{backgroundColor: '#FF8AA5', border:'none'}} onClick={()=>{AddApi()}} >Add</Button>
        </Modal.Footer>
      </Modal>
  
  
  
      <Modal
        show={editisopen}
        onHide={()=>{setEditIsOpen(false)}}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                value={editdata.IName}
                name="IName"
                type="text"
                onChange={handleEditChange}
              />
            </Form.Group>
            
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setEditIsOpen(false)}}>Close</Button>
          <Button style={{backgroundColor: '#FF8AA5', border:'none'}} onClick={()=>{EditApi(table.length !== 0 ? table[editindex !== '' ? editindex : 0].id : "")}} >Update</Button>
        </Modal.Footer>
      </Modal>
  
  
  
  
    </>
    )
  }
}
