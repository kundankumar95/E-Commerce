import React from 'react'
import './CSS/loginsignup.css'


const loginSignup = () => {
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

export default loginSignup
