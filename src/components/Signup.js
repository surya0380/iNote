import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate  } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({ userName: "", email: "", password: "", cpassword: "" })
  const history = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let result;
    const {userName, email, password} = credentials;
    axios
      .post(`http://localhost:5000/api/auth/createUser`,
        { userName, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          }
        })
      .then((response) => {
        result = response.data;
        console.log(result)
          localStorage.setItem("authToken", result.token);
          history("/")
      });
  }

  return (
    <div className='my-5'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Name</label>
          <input type="name" className="form-control" id="userName" name='userName' aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' minLength={3} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' minLength={3} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
