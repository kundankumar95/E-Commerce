import React, { useState } from 'react';
import './CSS/loginsignup.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    agree: false
  });

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (state === "Login") {
      login();
    } else {
      signup();
    }
  };

  const login = async () => {
    console.log("Login Function", formData);

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      } else {
        console.log("Login failed: ", responseData.errors);
        alert(responseData.errors || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please check the console for details.');
    }
  };

  const signup = async () => {
    console.log("Signup Function", formData);

    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors || 'Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };


  
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            {state === "Sign Up" && (
              <input
                name='username'
                value={formData.username}
                onChange={changeHandler}
                type="text"
                placeholder='Your Name'
                required={state === "Sign Up"}
                autoComplete="name"
              />
            )}
            <input
              name='email'
              value={formData.email}
              onChange={changeHandler}
              type="email"
              placeholder='Email Address'
              required
              autoComplete="email"
            />
            <input
              name='password'
              value={formData.password}
              onChange={changeHandler}
              type="password"
              placeholder='Password'
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit">Continue</button>
          {state === "Sign Up" ? (
            <p className="loginsignup-login">
              Already have an account? <span onClick={() => { setState("Login") }}>Login here</span>
            </p>
          ) : (
            <p className="loginsignup-login">
              Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span>
            </p>
          )}
          <div className="loginsignup-agree">
            <input
              type="checkbox"
              name='agree'
              id='agree'
              checked={formData.agree}
              onChange={changeHandler}
            />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;




