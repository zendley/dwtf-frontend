import React, { useEffect, useState } from 'react'

import axios from '../../../Api/Axios';
import * as axiosURL from '../../../Api/AxiosUrls';

import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

import loader from '../../../Assets/Dashboard_SVGs/loader.gif'
import edit from '../../../Assets/Dashboard_SVGs/editing.svg'
import deletee from '../../../Assets/Dashboard_SVGs/delete.svg'

import { CSVLink } from "react-csv";

var Url = axiosURL.Products;
var AddUrl = axiosURL.AddProducts;
var EditUrl = axiosURL.EditProducts;
var DeleteUrl = axiosURL.DeleteProducts;
var tok = localStorage.getItem('token')
var token = 'Bearer ' + tok;

export default function Products() {




  const [rerender, setRerender] = useState(false);
  const [table, setTable] = useState([])
  const [editisopen, setEditIsOpen] = useState(false)
  const [addisopen, setAddtIsOpen] = useState(false)
  
  const [editdata, setEditData] = useState([]);
  const [editimage, setEditImage] = useState([]);
  const [editindex, setEditIndex] = useState([]);
  const [adddata, setAddData] = useState([]);
  const [addimage, setAddImage] = useState([]);
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
    dName: table.length !== 0 ? table[index].product_name : "",
    price: table.length !== 0 ? table[index].price : "",
    desc: table.length !== 0 ? table[index].description : "",
    image: table.length !== 0 ? table[index].picture : "",
    percentage: table.length !== 0 ? table[index].perct_to_divide : "",
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



const handleImageAdd = e =>
{
  // console.log(e.target.files)
  setAddImage(e.target.files[0])
}

const handleImageEdit = e =>
{
  // console.log(e.target.files)
  setEditImage(e.target.files[0])
}






const AddApi = () => {
  // api Logic Here

  setLoaderMain(true);

  if (adddata.dName === ""){
      alert("Donut Name is Required")
  }
  else if (adddata.price === ""){
      alert("Price is Required")
  }
  else if (adddata.desc === ""){
      alert("Description is Required")
  }
  else if (addimage === ""){
      alert("Image is Required")
  }
  else if (adddata.percentage === ""){
      alert("Percentage to Divide is Required")
  }
  else
  {


    let data = new FormData();
    data.append('product_name', adddata.dName);
    data.append('description', adddata.desc);
    data.append('price', adddata.price);
    data.append('perct_to_divide', adddata.percentage);
    data.append('picture', addimage);


      const url = AddUrl;
      axios.post(url, 
        data,
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

  if (adddata.dName === ""){
    alert("Donut Name is Required")
}
else if (adddata.price === ""){
    alert("Price is Required")
}
else if (adddata.desc === ""){
    alert("Description is Required")
}
else if (adddata.percentage === ""){
    alert("Percentage to Divide is Required")
}
else
{


  let data = new FormData();
  data.append('product_name', editdata.dName);
  data.append('description', editdata.desc);
  data.append('price', editdata.price);
  data.append('perct_to_divide', editdata.percentage);
  data.append('picture', editimage);


    const url = EditUrl + `/${id}`;
    axios.post(url, 
      data,
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
  { label: "Donut Name", key: "product_name" },
  { label: "Description", key: "description" },
  { label: "Price", key: "Price" },
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
        Products
      </h4>
      <div className="buttons">
    <CSVLink style={{padding: '6.5px 35px',}} {...csvReport} className="b1">Download</CSVLink>
        <button style={{
          width: "175px",
          marginRight: '18px'
        }} className="b2"><Link style={{all: 'unset', cursor: 'pointer'}} to="/products" onClick={()=>{setAddtIsOpen(true);}} >Add New Product </Link></button>
      </div>
    </div>

    <table className="tablee">
  <thead>
    <tr>
      <th></th>
      <th>Donut Name</th>
      <th>Description</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>

    {table.map((tabl, index)=>{
      return(
      <tr key={tabl.id}>
        <td><img style={{width: '50px'}} src={'https://dwf.walnuthash.com/public/uploads/products/' + tabl.picture} alt={`Product Image`}  className="img-responsive" /></td>
        <td>{tabl.product_name}</td>
        <td>{tabl.description}</td>
        <td>{tabl.price}</td>
        <td>
        <Link style={{all: 'unset', cursor: 'pointer'}} to="/products" onClick={()=>{hadleEditModel(index); setEditIndex(index);}} ><img src={edit} alt="" /> </Link>
            
        <Link style={{all: 'unset', cursor: 'pointer'}} to="/products" onClick={()=>{ if (window.confirm('Are you sure you wish to delete this item?')) handleDeleteApi(tabl.id);}} > <img src={deletee} alt="" /> </Link>
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
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Donut Name</Form.Label>
            <Form.Control
              value={adddata.dName}
              name="dName"
              type="text"
              onChange={handleAddChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Price(PKR)</Form.Label>
            <Form.Control
              value={adddata.price}
              name="price"
              type="number"
              onChange={handleAddChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Description <span style={{color:'gray', fontSize:'10px', fontWeight:'100'}}>Only 500 characters</span></Form.Label>
            <Form.Control
              maxLength={500}
              as="textarea"
              value={adddata.desc}
              name="desc"
              rows={3}
              onChange={handleAddChange}
            />
          </Form.Group>
          
          {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Percentage to divide</Form.Label>
            <Form.Control
              value={adddata.percentage}
              name="percentage"
              type="number"
              onChange={handleAddChange}
            />
          </Form.Group> */}
          
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control
              name="image"
              type="file"
              onChange={handleImageAdd}
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
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Donut Name</Form.Label>
            <Form.Control
              value={editdata.dName}
              name="dName"
              type="text"
              onChange={handleEditChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Price(PKR)</Form.Label>
            <Form.Control
              value={editdata.price}
              name="price"
              type="number"
              onChange={handleEditChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Description <span style={{color:'gray', fontSize:'10px', fontWeight:'100'}}>Only 500 characters</span></Form.Label>
            <Form.Control
              maxLength={500}
              as="textarea"
              value={editdata.desc}
              name="desc"
              rows={3}
              onChange={handleEditChange}
            />
          </Form.Group>
{/* 
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Percentage to divide</Form.Label>
            <Form.Control
              value={editdata.percentage}
              name="percentage"
              type="number"
              onChange={handleEditChange}
            />
          </Form.Group> */}
          
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control
              name="image"
              type="file"
              onChange={handleImageEdit}
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