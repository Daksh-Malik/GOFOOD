import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function SignUp() {
    const [values,setValues] = useState({
        name: "",
        email: '',
        password: "",
        location: ""
    })

    const navigate = useNavigate()

    const handleSubmit = async(event) => {  //using native REST api methods instead of axios
        event.preventDefault()
        const response = await fetch("http://localhost:8080/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({name: values.name, email: values.email, password: values.password, location: values.location})
        })
        const json = await response.json()
        console.log(json) 

        if(!json.success){
            alert("Enter valid credentials")
        }
        else if(json.success){
            navigate('/login')
        }
    }
    return (
        <>
        <Navbar/>
            <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
                <div className='bg-dark p-3 rounded w-25'>
                    <h2>Sign-Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"><strong>Name</strong></label>
                            <input type="text" onChange={e => setValues({ ...values, name: e.target.value })} className="form-control" name="name" placeholder='Enter Name' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                            <input type="email" onChange={e => setValues({ ...values, email: e.target.value })} className="form-control" name="email" placeholder='Enter Email' />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                            <input type="password" onChange={e => setValues({ ...values, password: e.target.value })} className="form-control" name="password" placeholder='Enter Password' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="geolocation" className="form-label"><strong>Address</strong></label>
                            <input type="text" onChange={e => setValues({ ...values, location: e.target.value })} className="form-control" name="location" placeholder='Enter location' />
                        </div>
                        <button type="submit" className="btn btn-success w-100">Submit</button>
                        <p className='form-text'>You agree to our terms and policies.</p>
                        <Link to="/login"><button className='btn btn-default border w-100 bg-primary text-decoration-none'>Login</button></Link>
                    </form>
                </div>
            </div>
        <Footer/>
        </>
    )
}
