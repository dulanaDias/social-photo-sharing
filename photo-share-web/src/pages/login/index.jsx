import logo from './logo.svg';
import './App.css';
import background from './login-background.jpg'
import { useState } from 'react';


function Login() {
  const [isLogin, setIsLogin] = useState(true)

  const renderLogin = () => {
    return <>
      <div class="mb-3">
        <input type="email" class="form-control p-3" id="emailControl" placeholder="Email address" />
      </div>
      <div class="mb-3">
        <input type="password" class="form-control p-3" id="passwordControl" placeholder="Password" />
      </div></>
  }

  const renderRegister = () => {
    return <>
      <div class="mb-3">
        <input type="email" class="form-control p-3" id="emailControl" placeholder="Email address" />
      </div>
      <div class="mb-3">
        <input type="password" class="form-control p-3" id="passwordControl" placeholder="Password" />
      </div>
      <div class="mb-3">
        <input class="form-control p-3" id="passwordControl" placeholder="Username" />
      </div>
      </>
  }

  return (
    <div className="App">
      <div className="row">
        <img src={background} className="col-8 border img-fluid bg-purple" style={{
          backgroundImage: 'linear-gradient(to right bottom, #8e00ff, #00ffdb)'
        }} />

        <div class="col-4 p-4 text-black d- flex">
          <div class="d-flex align-items-start mb-3 pb-1">
            <span class="h1 fw-bold mb-0">{isLogin ? "Login" : "Sign Up"}</span>
          </div>
          {
            isLogin ? renderLogin() : renderRegister()
          }
          <button className='btn fw-bold btn-primary'
            style={{ backgroundImage: 'linear-gradient(to right bottom, rgb(0 178 244), rgb(91 151 229))' }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <div className='mt-3'>
            <p>{isLogin ? "Don't have a account ? " : "Already have an accont ? "}<span
              onClick={() => {
                setIsLogin(!isLogin)
              }} className='link-primary fw-bold'>{isLogin ? "Sign Up" : "Login"}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
