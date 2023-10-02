// import logo from './logo.svg'
import './registration.css'
import React, { useState, useEffect } from 'react'
import { Url } from '../../Constants/ApiUrlConstants'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'

function Registration() {
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobileNo: "",
        userRole: ""
    })
    const  [errorEmail,setErrorEmail] = useState(true);
    const  [errorPassword,setErrorPassword] = useState(true);
    const validateForm = () => {
        let countUpperCase = 0
        let countLowerCase = 0
        let countDigit = 0
        let countSpecialCharacters = 0

        if (userDetails.firstName.length == 0) {
            alert('Invalid Form, First Name can not be empty')
            return
        }
        if (userDetails.email.length == 0) {
            alert('Invalid Form, Email Address can not be empty')
            return
        }
        if (userDetails.password.length < 8) {
            alert(
                'Invalid Form, Password must contain greater than or equal to 8 characters.',
            )
            return
        }
        for (let i = 0; i < userDetails.password.length; i++) {
            const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '[', '{', ']', '}', ':', ';', '<', '>']
            if (specialChars.includes(userDetails.password[i])) {
                countSpecialCharacters++
            } else if (!isNaN(userDetails.password[i] * 1)) {
                countDigit++
            } else {
                if (userDetails.password[i] == userDetails.password[i].toUpperCase()) {
                    countUpperCase++
                }
                if (userDetails.password[i] == userDetails.password[i].toLowerCase()) {
                    countLowerCase++
                }
            }
        }
        if (countLowerCase == 0) {
            alert('Invalid Form, 0 lower case characters in password')
            return
        }
        if (countUpperCase == 0) {
            alert('Invalid Form, 0 upper case characters in password')
            return
        }
        if (countDigit == 0) {
            alert('Invalid Form, 0 digit characters in password')
            return
        }
        if (countSpecialCharacters == 0) {
            alert('Invalid Form, 0 special characters in password')
            return
        }
        try {
            fetch(Url.registerUser, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(userDetails),
            })
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log("Submit Error", err)
                })
        } catch (error) {
            console.log("Submit Error", error);
        }
    }

    const handleInputChange = (e, field) => {
        const actualValue = e.target.value;
        setUserDetails({
            ...userDetails,
            [field]: actualValue
        });
    }

    return (
        <div className="main">
            <div className='formDiv RegistrationForm'>
                    <span>User Create</span>
                <form>
                    <div class="form-group">
                        <label>
                            <input type="text" id="form_email" class="my_form-control" onChange={(e) => { handleInputChange(e, 'firstName') }} required="" />
                            <small class="my_place">First Name</small>
                            {errorEmail != true ? <div class="invalid-feedback">Please fill out this field.</div> : ""}
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="text" id="form_email" class="my_form-control" onChange={(e) => { handleInputChange(e, 'lastName') }} required="" />
                            <small class="my_place">Last Name</small>
                            {errorEmail != true ? <div class="invalid-feedback">Please fill out this field.</div> : ""}
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="text" id="form_email" class="my_form-control" onChange={(e) => { handleInputChange(e, 'mobileNo') }} required="" />
                            <small class="my_place">Mobile No.</small>
                            {errorEmail != true ? <div class="invalid-feedback">Please fill out this field.</div> : ""}
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="text" id="form_email" autoComplete='off' class="my_form-control" onChange={(e) => { handleInputChange(e, 'userRole') }} required="" />
                            <small class="my_place">User Role</small>
                            {errorEmail != true ? <div class="invalid-feedback">Please fill out this field.</div> : ""}
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="email" id="form_password" autoComplete='off' class="my_form-control" onChange={(e) => { handleInputChange(e, 'email') }} required="" />
                            <small class="my_place">Email </small>
                            {errorPassword != true ? <div class="invalid-feedback">Please fill out this field.</div> : ""}
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="password" autoComplete='off' id="form_password" class="my_form-control" onChange={(e) => { handleInputChange(e, 'password') }} required="" />
                            <small class="my_place">password</small>
                            {errorPassword != true ? <div class="invalid-feedback">Please fill out this field.</div> : ""}
                        </label>
                    </div>
                    <button style={{margin: "0 auto"}} type="submit" onClick={() => { validateForm() }} > Register </button>
                </form>
                <div className='bottomDiv'>

                    <NavLink to="/" className="CreateAccountBtn">Back to Login</NavLink>
                    {/* <NavLink to="/Registration" className="CreateAccountBtn">Forgot Passord</NavLink> */}
                </div>
            </div>
            {/* <form>
                <input
                    placeholder="First Name"
                    onChange={(e) => { handleInputChange(e, 'firstName') }}
                />
                <input
                    placeholder="Last Name"
                    onChange={(e) => { handleInputChange(e, 'lastName') }}
                />
                <input
                    placeholder="Mobile Number"
                    onChange={(e) => { handleInputChange(e, 'mobileNo') }}
                />
                <input placeholder="userRole"
                    onChange={(e) => { handleInputChange(e, 'userRole') }}
                />
                <input placeholder="Email"
                    onChange={(e) => { handleInputChange(e, 'email') }}
                />
                <input
                    placeholder="Password"
                    onChange={(e) => { handleInputChange(e, 'password') }}
                />
                <button
                    type="submit"
                    onClick={() => {
                        validateForm()
                    }}
                >
                    Submit
                </button>
            </form> */}
            {/* <NavLink to="/">Back to Login</NavLink> */}
        </div>
    )
}

export default Registration
