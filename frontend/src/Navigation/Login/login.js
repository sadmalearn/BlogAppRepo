// import logo from './logo.svg'
import './login.css'
import React,{ useState,useEffect } from 'react'
import { Url } from '../../Constants/ApiUrlConstants'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const Login = () =>{
    const location = useHistory()
    const [loginDetails, setLoginDetails] = useState({
        email : '',
        password : ''
    })
    const  [errorEmail,setErrorEmail] = useState(true);
    const  [errorPassword,setErrorPassword] = useState(true);
    // var errorPassword = true;
    const validateForm = () => {
        console.log(loginDetails);
        if(loginDetails.email == ""){
            setErrorEmail (false);
        }
        if(loginDetails.password == ""){
            setErrorPassword (false);
        }
        if (loginDetails.email != "" && loginDetails.password != ""){
        try {
            fetch(Url.login, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify(loginDetails),
            })
              .then((response) => response.json())
              .then((res) => {
                console.log(res);
                location.push('/main/Blogs')
              }).catch((err) => {
                console.log("Submit Error", err)
              })
          } catch (error) {
            console.log("Submit Error", error);
          }   
            
        } 
    
        }
    
    const handleInputChange = (e, field) => {
        const actualValue = e.target.value;
        setLoginDetails({
            ...loginDetails,
            [field]: actualValue
        });
        if (field == "email") {
            setErrorEmail (true);
        }else{
            setErrorPassword (true);

        }
    }
    
    return (
        <div className="main">
                <div className='formDiv'>
                    <span>Login</span>
                <form>
                <div class="form-group">
                    <label>
                    <input type="text" id="form_email" class="my_form-control" onChange={(e) => { handleInputChange(e, 'email') }} required="" />
                        <small class="my_place">Your email</small>
                        {errorEmail != true ? <div class="invalid-feedback">Please fill out this field.</div> : ""}
                    </label>
                </div>  
                <div class="form-group">
                    <label>
                    <input type="text" id="form_password" class="my_form-control" onChange={(e) => { handleInputChange(e, 'password') }} required="" />
                        <small class="my_place">Your password</small>
                        {errorPassword != true ? <div class="invalid-feedback">Please fill out this field.</div> : ""}
                    </label>
                </div> 
                <button type="submit" onClick={() => { validateForm() }} > Submit </button>
            </form>
            <div className='bottomDiv'>
                
            <NavLink to="/Registration" className="CreateAccountBtn">Create Account</NavLink>
            <NavLink to="/Registration" className="CreateAccountBtn">Forgot Passord</NavLink>
            </div>
                </div>
        </div>
    )
}

export default Login
