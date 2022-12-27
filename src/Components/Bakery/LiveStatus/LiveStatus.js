import React from 'react'

import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";

import axios from '../../../Api/Axios';
import * as axiosURL from '../../../Api/AxiosUrls';

import { Modal, Button, Form } from "react-bootstrap";

import loader from '../../../Assets/Dashboard_SVGs/loader.gif'
import download from '../../../Assets/Dashboard_SVGs/DownloadIcon.svg'
import nodatafound from '../../../Assets/Dashboard_SVGs/NoContentFound.svg'


var getLiveSales = axiosURL.liveSales;

var tok = localStorage.getItem('token')
var token = 'Bearer ' + tok;


export default function LiveStatus() {

    const [table, setTable] = useState([])
    const [header, setHeader] = useState([])
    const [rerender, setRerender] = useState(false);
    const [loadermain, setLoaderMain] = useState(true)
    const [date, setDate] = useState('')
    const [message, setMessage] = useState('')
    const [total_prod, setTotalProd] = useState(true)



    useEffect(() => {
        getData();
      }, [rerender]);


    const getData = async () => {  
        
        await axios.get(getLiveSales,
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
                    console.log(response.data)

                    setHeader(response.data.header);
                    setTable(response.data.dataa);
                    setTotalProd(response.data.total_production);
                    setDate(response.data.date);
                    setMessage(response.data.message)

                    setLoaderMain(false);
                    // console.log(response.data)

                    
                }
            })


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
    else if(message === "Nothing Assigned Yet")
    {
        return(
            <div style={{
                textAlign: 'center',
                height: '92vh',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <img style={{height: '350px', alignSelf: 'center',}} src={nodatafound} alt="" />
            </div>
        );
    }
    else
    {

    return (
        <div>



<div className="px-3 py-3">
                <div className="a">
                    <h2>Total Production = <span>{total_prod}</span></h2>
    
                    <h2>{date}</h2>
                </div>
                <div className="a">
                    {/* <h2>Remaining = {remainingProd}</h2> */}
                    <div className="buttons">

                        {/* <button style={{width:'140px'}} onClick={()=>{setMovementIsOpen(true);} } className="pBut">
                          <span>
                            <img style={{height: '10px'}} src={addmovementimg} alt="" />
                            </span>  Add Movement
                        </button> */}
                    </div>
                </div>
                    <div  className="table">
        
                        {header.length === 0  ? 
                        "Hello"
                        : 
                        table.length === 0  ? 
                        "Hello"
                        : 
                        

                        



                        
                        <BootstrapTable
                        keyField="id"
                        columns={header}
                        data={table}
                        striped
                        hover
                        condensed
                        // rowStyle={ rowStyle2 }
                        
                        
                        />
                        
                        }
                    </div>

          
        </div>


            
  </div>
    )
    }
}
