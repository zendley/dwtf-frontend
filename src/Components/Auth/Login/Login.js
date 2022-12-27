import "./Login.css"
import React, {useState} from 'react'

// import Axios from '../../../Api/Axios';
import axios from '../../../Api/Axios';
import * as axiosURL from '../../../Api/AxiosUrls';
import ll2 from '../../../Assets/Images/loginlogo.png';

// const Login_Url = "http://127.0.0.1:8000/api/auth/login";
var Login_Url = axiosURL.Login;




export default function Login(props) {


    const [errMsg, setErrMsg] = useState('');
    const [creds, setCreds] = useState({
        username: '',
        password: ''
      });

      


      const submitHandler = async (e) => {
        e.preventDefault();

        // console.log('Pressed');
        
        const user = creds.username; 
        const password = creds.password; 
        
        try {
            const response = await axios.post(Login_Url, 
                JSON.stringify({email: user, password: password}),
                {
                    headers:{ 'Content-Type': 'application/json' }
                }
                );
                // console.log('Pressed2');
                
          const accessToken = response.data.token;
          const role = response.data.Role;

          localStorage.setItem('token', accessToken);
          localStorage.setItem('role', role);
          

          props.setToken(accessToken)
          props.setRole(role)
          

          window.location.href="/"


  
          setCreds({
            username: '',
            password: ''
          });

          
  
        } catch (err) {
          if(!err.response){
            setErrMsg('No server response');
          }
          else if(err.response.status === 400){
            setErrMsg('Missing Username or Password');
          }
          else if(err.response.status === 401){
            setErrMsg('Unauthorized');
          }
          else {
            setErrMsg('Login Failed');
          }
  
          
        }
  
    }

    const handleCredsChange = e => {
      
        const { name, value } = e.target;
        setCreds(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


  return (
    <>
      <div className="row">

        <div className="col-6 left">
          <img style={{height: '100vh',}} src={ll2} alt="" />
        </div>

        <div className="col-6 right">
            <h2 className="my-4">Sign In To Dashboard</h2>

            <div className="card">
              <form onSubmit={submitHandler}>
                <div className="box">
                <div className="form__group field">
                  <input type="input" className="form__field" placeholder="Name" name="username" id='name' value={creds.username} onChange={handleCredsChange} required />
                  <label htmlFor="name" className="form__label">Name</label>
                </div>
                <div className="form__group field">
                  <input type="password" className="form__field" placeholder="Name" name="password" id='password' value={creds.password} onChange={handleCredsChange} required />
                  <label htmlFor="password" className="form__label">Password</label>
                </div>
                  {/* <input className="form-control inp" type="text" />
                  <input className="form-control inp" type="text" /> */}

                  <button className="button">Sign In</button>
                </div>
              </form>

              {/* <p className="forget">Forget Your Password</p> */}

            </div>

              <p className="bottom">© Design & developed by SpeckPro Digital</p>
            
        </div>

      </div>
    </>


  )
}
