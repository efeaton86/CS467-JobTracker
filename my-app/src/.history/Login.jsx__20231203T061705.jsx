import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
	e.preventDefault();
	console.log(email); 
    }

    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
	        <label htmlFor="Email">email</label>
	        <input value={email} onChange={(e) => setEmail(e.target.value)} type="emaiil" placeholder="youremail@gmail.com" id="email" name="email" />
 	        <label htmlFor="Password">password</label>
	        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*******" id="password" name="password" />
	        <button type="Submit">Log In</button>
	    </form>
	    <button className="link-btn" onClick={() => props.onFormSwitch('register')} >Do not have an account? Register here.</button>
	</div>
    )
} 
