import { useState, useEffect } from "react";

import axios from '../../../Api/Axios';
import * as axiosURL from '../../../Api/AxiosUrls';

import loader from '../../../Assets/Dashboard_SVGs/loader.gif'

var Notification = axiosURL.Notifications;

var tok = localStorage.getItem('token')
var token = 'Bearer ' + tok;

export default function Notifications() {

  const [table, setTable] = useState([]);
  const [loadermain, setLoaderMain] = useState(true);


  useEffect(() => {
    getData();
  }, []);


  const getData = () => {

    setLoaderMain(true);

    const url = Notification
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
                setTable(response.data);
                setLoaderMain(false);

                // console.log(response.data)

                
            }
        })

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
                <div style={{marginTop: '10px'}} className="kiosk">
                    
                    <div style={{textAlignLast: 'center',}} className="top">
                      <h4 style={{color: '#463B3B'}}>
                        Notifications
                      </h4>
        
                    </div>
                    
                    <table className="tablee">
                    <thead>
                    <tr>
                      <th>Kiosk</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>date</th>
                     
                    </tr>
                    </thead>
                    <tbody>
                    
                    {table.map((tabl, index)=>{
                      return(
                      <tr key={tabl.id}>
                        <td>{tabl.kiosk}</td>
                        <td>{tabl.cate}</td>
                        <td>{tabl.type}</td>
                        <td>{tabl.desc}</td>
                        <td>{tabl.date}</td>
                      </tr>
                      );
                    })}
                    
                    
                    </tbody>
                    </table>

                   

                </div>
            </>
      )
    }

}
