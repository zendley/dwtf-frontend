
import "./Rtable.css"
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
// import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';


import axios from '../../../Api/Axios';
import * as axiosURL from '../../../Api/AxiosUrls';


import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

import loader from '../../../Assets/Dashboard_SVGs/loader.gif'
import download from '../../../Assets/Dashboard_SVGs/DownloadIcon.svg'
import addmovementimg from '../../../Assets/Dashboard_SVGs/AddMovementIcon.svg'

var EditUrl = axiosURL.Edit_Add_Prod;
var BakeryData = axiosURL.Add_prod_Bakery_Data;
var BakeryDataEdit = axiosURL.Bakery_Data_Edit_Add_Prod;
var BakeryTable = axiosURL.Bakery_Table;
var AddMovement = axiosURL.Add_Movement;
var getkiosk = axiosURL.bakery_Kiosk;
var Submit = axiosURL.Submit_Add_Prod;
var Clear_Url = axiosURL.clear_production;
var flavs_Url = axiosURL.flav_name;


var tok = localStorage.getItem('token')
var token = 'Bearer ' + tok;

const { ExportCSVButton } = CSVExport;



export default function AddProd() {

    
    
    const [totalProd, setTotalProd] = useState();
    const [date, setDate] = useState();
    const [remainingProd, setRemainingProd] = useState();
    const [columns, setColumns] = useState([]);
    // const [table, setTable] = useState([]);
    const [data, setData] = useState([]);
    const [edata, setEData] = useState([]);
    const [rerender, setRerender] = useState(false);
    const [rerender2, setRerender2] = useState(false);
    const [loadermain, setLoaderMain] = useState(true)
    const [skiosks, setkiosk] = useState([])
    const [movementisopen, setMovementIsOpen] = useState(false)
    const [from, setFrom] = useState('Select From')
    const [to, setTo] = useState('Select To')
    const [flavour, setFlavour] = useState('Select Flavour')
    const [flavlist, setFlavList] = useState([])
    const [flavamt, setFlavAmt] = useState([])
    const [butt, setButt] = useState('')
    const [red, setRed] = useState([])
    const [isred, setIsRed] = useState()
    const [isSubmit, setIsSUBMIT] = useState()

    const [inputFields, setInputFields] = useState([
        {flavour: '', quantity: ''},
    ])

    // const handleFormChange = (index, event) => {
    //     let data = [...flavamt];
    //     data[index][event.target.name] = event.target.value;
    //     setFlavAmt(data);
    // }

    const handleFormChange = e => {
        const { name, value } = e.target;
        setFlavAmt(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

    useEffect(() => {
      getData();
    }, [rerender]);

    useEffect(()=>{
        handleRemainingProd()
    }, [totalProd, rerender]);

    useEffect(() => {
        // console.log("Hey");
    }, [remainingProd, rerender2]);

    

    useEffect(()=>{
        const getData = setTimeout(() => {
            const url = EditUrl
            axios.post(url, {
                totalprod: totalProd,
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
                    alert("Error", response.status)
                }
                else
                {   
                    // console.log('Done')
                    // setRerender(!rerender); 
                }
            })
        }, 2000)

        return () => clearTimeout(getData)

    }, [totalProd])

    var rp = 0;

    const getData = async () => {
        rp = remainingProd;
        // console.log(rp);
       await axios(BakeryData,
            {
                headers: {
                  'Authorization': token,
                }
            }
            ).then(async (res) => {
            var da = JSON.parse(res.data.data.data);
            setTotalProd(res.data.data.total_prod)
            setDate(res.data.date)
            setData(da);
            setButt(res.data.data.today);
            setRed(res.data.red);
            setIsRed(res.data.isRed);
            setIsSUBMIT(res.data.isSubmit);

            console.log(res.data)
            
        });     
        
        


     await axios(BakeryTable, 
        {
            headers: {
              'Authorization': token,
            }
        }
        ).then(async (res) => {
        // setTable(res.data);
        var col = [];
        // console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
            var data = {
                'text': res.data[i].perct_to_divide != null ? res.data[i].text  + ' (' + res.data[i].perct_to_divide + '%)': res.data[i].text,
                dataField: res.data[i].datafield,
                editable: res.data[i].editable,
                headerAlign: 'center',
                editorClasses: 'editing-name',
                headerStyle: { 
                    fontSize: '13px',
                    fontWeight: 100,
                    backgroundColor: '#463B3B',
                    color: 'white',
                    width: '100px'
                },
                validator:(newValue, row, column)=>{
                    if(isNaN(newValue))
                    return{
                        valid:false,
                        message:"Please Enter Numeric Value"
                    }
                    if(newValue === "" || newValue === null)
                    return{
                        valid:false,
                        message:"Field can't be left blank"
                    }

                    // if(rp - newValue < 0)
                    // return{
                    //     valid:false,
                    //     message:"You don't have enough Stock"
                    // }
                    
                    return true;
                }
            }
            col.push(data)
          }
        setColumns(col)
        });
        setLoaderMain(false)

        
            try {
                const kioskss = await axios.get(getkiosk,
                  {
                    headers: {
                      'Authorization': token,
                    }
                  }
                  );
        
                  var kiosks = kioskss.data;
        
                  setkiosk(kiosks);
        
        
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
    };


    const handleAfterSave = () => {
        // setLoaderMain(true);
        // console.log(data)
        var dataaa = JSON.stringify(data); 
        // console.log(dataaa)

        setEData(dataaa)
        handleRemainingProd();

        
    }


    const HandleSaveButt = () => {

        if(remainingProd < 0)
        {
            alert('Production limit has been exceeded.')
        }
        else
        {
            setLoaderMain(true);
            const url = BakeryDataEdit
                axios.post(url, {
                    data: edata,
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
                        alert("Error", response.status)
                    }
                    else
                    {   
                        // console.log(response.data)
                        setRerender(!rerender); 
                        setLoaderMain(false);
                        
                    }
                })
        }

    }


    const HandleSubmitButt = () => {
        if(isred === 1)
        {
            alert("Please fix the highlighted row(s)!")
        }
        else
        {
            if(remainingProd < 0)
        {
            alert('Production limit has been exceeded.')
        }
        else
        {
            setLoaderMain(true);

            const url = Submit;
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
                    console.log(response.data)
                    
                    
                    setRerender(!rerender);
                    setLoaderMain(false);
                }
            })
            alert("Submitted successfully!")
        }
    }
    }


    const handleBeforeSave = () => {
        // console.log("before Save Run");
        setRerender2(!rerender); 
        
    }


    

    const handleTotalChange = async (event) => {
        setTotalProd(event.target.value);


        handleRemainingProd();
    }

    const handleRemainingProd = () => {
        let quant = 0;
        for (let i = 0; i < data.length; i++)
        {
            var val = data[i].quantity;
            let num = parseInt(val, 10);
            // console.log(num);
            quant = quant + num;
        }

        setRemainingProd(totalProd - quant)

        
    }

    const handleFromChange = async (e) => {
        setFrom(e.target.value)

        try {
            const res = await axios.post(flavs_Url,
                {
                    branch:e.target.value
                },
              {
                headers: {
                  'Authorization': token,
                }
              }
              );
    
              var list = res.data;
            //   console.log(res.data)
    
              setFlavList(list);
    
    
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
    const handleToChange = (e) => {
        setTo(e.target.value)
    }

    const handelMovement = () => {
        // AddMovement

        if (from === "Select From"){
            alert("From is Required")
        }
        else if(to === "Select To"){
            alert("To is Required")
        }
        else
        {

            setLoaderMain(true);


            const url = AddMovement;
            axios.post(url,
            {
                from: from,
                to: to,
                flavours: JSON.stringify(flavamt),
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
                    alert("Error", response.status)
                }
                else
                {   
                    console.log(response.data)
                    setFrom('Select From')
                    setTo('Select To')
                    setMovementIsOpen(false);
                    setInputFields([]);
                    setRerender(!rerender);
                    setFlavList([]);
                    setFlavAmt([]);
                    setLoaderMain(false);
                }
            })
        }
    }

    const rowStyle2 = (row, rowIndex) => {
        const style = {};

        for (let i = 0; i < red.length; i++) {
            if (row.id === red[i]) {
                style.backgroundColor = 'red';
              }
        }

        
        return style;
      };



      const handleClear = () => {
      

        setLoaderMain(true);
  
              const url = Clear_Url;
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
                      setLoaderMain(false);
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
    else
    {
        return (


            <>

            <div className="px-3 py-3">
                    <h2>Add Production</h2>
                <div className="a">
                    <h2>Total Production = <span><input onChange={handleTotalChange} value={totalProd} type="number" /></span></h2>
    
                    <h2>{date}</h2>
                </div>
                <div className="a">
                    <h2>Remaining = {remainingProd}</h2>
                    <div className="buttons">

                    {/* <button style={{width:'130px'}} onClick={handleClear } className="pBut">
                  Clear
                </button> */}
                        

                <ToolkitProvider
                    keyField="id"
                    data={ data }
                    columns={ columns }
                    exportCSV = {{
                        fileName: `${date}.csv`,
                    }}
                    >
                    {
                        props =>
                        <>
                        <ExportCSVButton className="pBut" { ...props.csvProps }> <span><img style={{height: '10px', marginRight: '5px', marginLeft: '10px'}} src={download} alt="" /></span> Download</ExportCSVButton>
                        
                    
                        <div style={{display: 'none'}}>
                        <BootstrapTable style={{display: 'none'}} { ...props.baseProps } />
                        </div>
                        </>
                    }
                </ToolkitProvider>
                        
                        {/* <button style={{width:'140px'}} onClick={()=>{setMovementIsOpen(true);} } className="pBut">
                          <span>
                            <img style={{height: '10px'}} src={addmovementimg} alt="" />
                            </span>  Add Movement
                        </button> */}
                    </div>
                </div>
            <div  className="table">
    
                {columns.length === 0  ? 
                "Hello"
                : 
                data.length === 0  ? 
                "Hello"
                : 
                

                



                
                <BootstrapTable
                id="toCsv"
                keyField="id"
                data={data}
                columns={columns}
                striped
                hover
                condensed
                rowStyle={ rowStyle2 }
                cellEdit={cellEditFactory({
                    mode: "click",
                    blurToSave: true,
                    beforeSaveCell: handleBeforeSave,
                    afterSaveCell: handleAfterSave,
                    // nonEditableRows: () => [1, 2, 3],
                })}
                
                />
                
            }
          </div>

          {
          isSubmit === 0 ?

          <div className="float-end">
          {butt === 1 ? 
            <button onClick={()=>{HandleSaveButt();} } className="pBut">
                            Update
            </button>
            : 
            <button onClick={()=>{HandleSaveButt();} } className="pBut">
                            Assign
            </button>
            
            } 

            <button onClick={()=>{HandleSubmitButt();} } className="pBut">
                            Submit
            </button>

          </div> 
          : 
          <div className="float-end">
            <Link to="/new_production" >
            <button className="pBut">
                Add New Production
            </button>
            </Link>
          </div>


          }


          
        
        
            <Modal
                show={movementisopen}
                onHide={()=>{setMovementIsOpen(false)}}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                  <Modal.Title>Add Movement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>From</Form.Label>
                      <Form.Control
                        value={from}
                        name="perct"
                        as="select"
                        placeholder="From"
                        onChange={handleFromChange}
                      >
                        <option >Select From</option>
                        {skiosks.map((kis, index)=>{
                            return(
                                <option key={index} value={kis.location}>{kis.location}</option>
                            );

                        })}
                    </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>To</Form.Label>
                      <Form.Control
                        value={to}
                        name="perct"
                        as="select"
                        placeholder="TO"
                        onChange={handleToChange}
                      >
                          <option >Select To</option>
                        {skiosks.map((kis, index)=>{
                            return(
                                <option key={index} value={kis.location}>{kis.location}</option>
                            );

                        })}
                    </Form.Control>
                    </Form.Group>

                    {flavlist.map((kis, index) => {
                return (
                    <div key={index} style={
                        {
                            marginTop: '10px',
                            alignItems: 'center',
                        }
                    } className="row">
                        <div className="col-6">
                           
                                         <p style={{
                                            marginBottom: '0px',
                                         }} key={index}>{kis.flavour_name} ({kis.production - kis.sold})</p>
                        </div>
                        <div className="col-6">
                            <Form.Group  controlId="exampleForm.ControlInput1">
                            <Form.Control
                                value={flavamt[kis.flavour_name]}
                                name={kis.flavour_name}
                                type="number"
                                placeholder="Enter amount or leave empty for no movement"
                                onChange={handleFormChange}
                            />
                            </Form.Group>

                        </div>
                    </div>
                )
                })}



                    
                </Form>

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={()=>{setMovementIsOpen(false)}}>Close</Button>
                  <Button style={{backgroundColor :'#FF8AA5', border: 'none',}} onClick={()=>{handelMovement()}} >Move</Button>
                </Modal.Footer>
              </Modal>

        </div>
        </>


        );
    }


    
}
