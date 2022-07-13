import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate  } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const history= useNavigate ();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let result;
        axios
            .post(`http://localhost:5000/api/auth/login`,
                { email: credentials.email, password: credentials.password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            .then((response) => {
                result = response.data;
                console.log(result)
                if (result.success) {
                    localStorage.setItem("authToken", result.token);
                    history("/")
                }
            });
    }

    return (
        <div className="my-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
