import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Login(){
    const [values,setValues] = useState({
        email: '',
        password: "",
    })

    const navigate = useNavigate()

    const handleSubmit = async(event) => {  //using native REST api methods instead of axios
        event.preventDefault()
        const response = await fetch("http://localhost:8080/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({email: values.email, password: values.password})
        })
        const json = await response.json()
        console.log(json) 

        if(!json.success){
            alert("Enter valid credentials")
        }
        else if(json.success){
            localStorage.setItem("userEmail",values.email)
            localStorage.setItem('authToken',json.authToken)
            navigate('/')
        }
    }
    return (
        <>
        <Navbar/>
            <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
                <div className='bg-dark p-3 rounded w-25'>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                            <input type="email" onChange={e => setValues({ ...values, email: e.target.value })} className="form-control" name="email" placeholder='Enter Email' />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                            <input type="password" onChange={e => setValues({ ...values, password: e.target.value })} className="form-control" name="password" placeholder='Enter Password' />
                        </div>
                        <button type="submit" className="btn btn-success w-100">Submit</button>
                        <p></p>
                        <Link to="/signup"><button className='btn btn-default border w-100 bg-primary text-decoration-none'>Sign Up</button></Link>
                    </form>
                </div>
            </div>
        <Footer/>
        </>
    )
}