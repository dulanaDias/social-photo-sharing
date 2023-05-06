import logo from './logo.svg';
import './App.css';
import background from './login-background.jpg'
import { useState } from 'react';
import network from '../../network';
import { useNavigate } from 'react-router-dom'

function Login() {
  const [isLogin, setIsLogin] = useState(true)

  const [details, setDetails] = useState({
    email: '',
    password: '',
    username: ''
  })

  const navigate = useNavigate()

  const onChange = (event) => {
    const updatedDetails = { ...details }
    updatedDetails[event.target.name] = event.target.value
    setDetails(updatedDetails)
  }

  const onButtonPress = async () => {
    if(isLogin) {
      const result = await network.post('login', {
        email: details.email,
        password: details.password
      })
      if(result.data.success) {
        localStorage.setItem('authToken', result.data.token)
        navigate('/home', { replace: true })
      } else {
        console.log(result.data)
      }
    } else {
      
      const result = await network.post('register', {
        email: details.email,
        password: details.password,
        name: details.username
      })
      if(result.data.success) {
        localStorage.setItem('authToken', result.data.token)
        navigate('/home', { replace: true })
      } else {
        console.log(result.data)
      }
    }
  }

  const renderLogin = () => {
    return <>
      <div class="mb-3">
        <input
          type="email"
          name='email'
          class="form-control p-3"
          placeholder="Email address"
          value={details.email}
          onChange={onChange}
        />
      </div>
      <div class="mb-3">
        <input
          type="password"
          name='password'
          class="form-control p-3"
          placeholder="Password"
          value={details.password}
          onChange={onChange}
        />
      </div></>
  }

  const renderRegister = () => {
    return <>
      <div class="mb-3">
        <input
          type="email"
          class="form-control p-3"
          name='email'
          value={details.email}
          onChange={onChange}
          placeholder="Email address" />
      </div>
      <div class="mb-3">
        <input
          type="password"
          class="form-control p-3"
          name='password'
          value={details.password}
          onChange={onChange}
          placeholder="Password" />
      </div>
      <div class="mb-3">
        <input
          class="form-control p-3"
          name='username'
          value={details.username}
          onChange={onChange}
          placeholder="Username" />
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
          <button 
            className='btn fw-bold btn-primary'
            onClick={onButtonPress}
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
