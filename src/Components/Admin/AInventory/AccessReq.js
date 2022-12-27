import React, { useEffect, useState } from 'react'

import axios from '../../../Api/Axios';
import * as axiosURL from '../../../Api/AxiosUrls';

import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

import loader from '../../../Assets/Dashboard_SVGs/loader.gif'

var tok = localStorage.getItem('token')
var token = 'Bearer ' + tok;

var dataURL = axiosURL.DailyRequestedInv;

export default function AccessReq() {

  const [rerender, setRerender] = useState(false);
  const [list, setList] = useState([]);
  const [loadermain, setLoaderMain] = useState(true)
  const [addisopen, setAddtIsOpen] = useState(false)
  const [index, setIndex] = useState('')


  useEffect(() => {
    getData();
  }, [rerender])

  const getData = async (e) => {
    setLoaderMain(true);

    try {
        const response = await axios.get(dataURL,
          {
            headers: {
              'Authorization': token,
            }
          }
          );

          var res = response.data;

        //   console.log(res);

          setList(res);
          setLoaderMain(false);


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

    //   console.log(err);
      
    }

    
  }

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
          Accessories Request
          </h4>
          
        </div>

        {list.map((tabl, index)=>{
      return(

        <div key={index}>
        
        {/* cards */}

        <div style={
            {
                padding: '26px 0px',
                border: '1px solid white',
                backgroundColor: 'white',
                borderRadius: '6px',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                fontSize: '12px',
                marginBottom: '12px',
            }
        }>

            <div style={{justifyContent: 'center'}} className="row">

                <div style={{textAlign: 'center'}} className="col-2">
                    <div>
                        <p style={
                            {
                                color: 'grey',
                            }
                        }>
                            Kiosk
                        </p>
                    </div>
                    <div>
                        <p style={
                            {
                                marginBottom: '0px',
                                height: '30px',
                                display: 'flex',
                                placeContent: 'center',
                                placeItems: 'center',
                                fontWeight: '600'

                            }
                        }>
                            {tabl.Data.kiosk}
                        </p>
                    </div>
                </div>
                
                <div style={{textAlign: 'center'}} className="col-2">
                    <div>
                        <p style={
                            {
                                color: 'grey',
                            }
                        }>
                        Request Date & Time
                        </p>
                    </div>
                    <div>
                        <p style={
                            {
                                marginBottom: '0px',
                                height: '30px',
                                display: 'flex',
                                placeContent: 'center',
                                placeItems: 'center',
                                fontWeight: '600'
                            }
                        }>
                        {tabl.Date} {tabl.Time}
                        </p>
                    </div>
                </div>

                <div 
                // style={{textAlign: 'center'}}
                 className="col-8">
                    <div>
                        <p style={
                            {
                                color: 'grey',
                                marginLeft: '40px',
                            }
                        }>
                        Accessories Requested
                        </p>
                    </div>
                    <div>
                        <p style={
                            {
                                marginLeft: '40px',
                                marginBottom: '0px',
                                height: '30px',
                                display: 'flex',
                                // placeContent: 'center',
                                placeItems: 'center',
                                fontWeight: '600'
                            }
                        }>
                        {/* {tabl.Date} */}
                        Gloves ({list[index].Data.gloves}),
                        Boxes ({list[index].Data.boxes}),
                        Bags ({list[index].Data.bags}),
                        Knife ({list[index].Data.knife}),
                        </p>
                    </div>
                </div>

                {/* <div style={{textAlign: 'center'}} className="col-3">
                    <div>
                        <p style={
                            {
                                color: 'grey',
                            }
                        }>
                        Accessories Requested
                        </p>
                    </div>
                    <div>
                       <button
                       onClick={() => {setAddtIsOpen(true); setIndex(index) }}
                       style={
                        {
                            backgroundColor: 'white',
                            border: 'none',
                            boxShadow: 'rgb(0 0 0 / 10%) 0px 4px 12px',
                            borderRadius: '50px',
                            width: '90px',
                            height: '30px'
                        }
                       }
                       >
                        Details
                       </button>
                    </div>
                </div> */}

                


            </div>


        </div>
        </div>
        );
      })}

        




        </div>



    <Modal
      show={addisopen}
      onHide={()=>{setAddtIsOpen(false)}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
      <Modal.Header closeButton>
        <Modal.Title>Requested Accessories</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      
      {/* Card */}

        <div style={
            {
                marginBottom: '15px',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
            }
        }>
            <div style={
                {
                    display: 'flex',
                    justifyContent: 'space-between',
                }
            }>
                <p
                    style={
                        {
                            marginBottom: '0px',
                        }
                    }
                >
                    Gloves
                </p>
                <p
                    style={
                        {
                            marginBottom: '0px',
                        }
                    }
                    >
                    {list != [] ? list[index != '' ? index : 0].Data.gloves : " "}
                </p>
            </div>
        </div>


      {/* Card */}

        <div style={
            {
                marginBottom: '15px',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
            
            }
        }>
            <div style={
                {
                    display: 'flex',
                    justifyContent: 'space-between',
                }
            }>
                <p
                    style={
                        {
                            marginBottom: '0px',
                        }
                    }
                >
                    Boxes
                </p>
                <p
                    style={
                        {
                            marginBottom: '0px',
                        }
                    }
                >
                    {list != [] ? list[index != '' ? index : 0].Data.boxes : " "}
                </p>
            </div>
        </div>


      {/* Card */}

        <div style={
            {
                marginBottom: '15px',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
            }
        }>
            <div style={
                {
                    display: 'flex',
                    justifyContent: 'space-between',
                }
            }>
                <p
                    style={
                        {
                            marginBottom: '0px',
                        }
                    }
                >
                    Bags
                </p>
                <p
                    style={
                        {
                            marginBottom: '0px',
                        }
                    }
                >
                    {list != [] ? list[index != '' ? index : 0].Data.bags : " "}
                </p>
            </div>
        </div>


      {/* Card */}

        <div style={
            {
                marginBottom: '15px',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
            }
        }>
            <div style={
                {
                    display: 'flex',
                    justifyContent: 'space-between',
                }
            }>
                <p
                    style={
                        {
                            marginBottom: '0px',
                        }
                    }
                >
                    Knife
                </p>
                <p
                    style={
                        {
                            marginBottom: '0px',
                        }
                    }
                >
                    {list != [] ? list[index != '' ? index : 0].Data.knife : " "}
                </p>
            </div>
        </div>


      </Modal.Body>
    </Modal>


    </>
  )
}
}
