import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './pages.css';
import {BsChatDotsFill as ChatIcon} from 'react-icons/bs';
import axios from 'axios';
import { loginRoute } from '../utils/API_Routes';



const Login = () => {

  const navigate = useNavigate();

  const [val, setVal] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if(localStorage.getItem('chat-app-user')) {
      navigate('/');
    };
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if(handleValid()){
      const { username, password } = val;
      const {data} = await axios.post(loginRoute, {
        username,
        password,
      });
      if(data.status === false){
        alert(data.msg);
      };
      if(data.status === true){
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/');
      };
    }
  };

  const handleValid = () => {
    const { username, password } = val;
    if(password === ''){
      alert("Please enter correct email and password !");
      return false;
    }else if(username === ''){
      alert("Please enter correct email and password !");
      return false;
    }
    return true;
  };

  const handleChange = e => {
    setVal({ ...val, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='formContainer'>
        <form onSubmit={e => handleSubmit(e)}>
          <div className='brand'>
            <h1><ChatIcon /> CHAT APP</h1>
          </div>

          <input 
            type='text' 
            placeholder='Username' 
            name='username' 
            onChange={e => handleChange(e)}
            min='3'
            required
          />
          
          <input 
            type='password' 
            placeholder='Password' 
            name='password' 
            onChange={e => handleChange(e)}
            required
          />
      
          <button type='submit'>LOGIN</button>
          <span>Need an account? <Link to="/register">Register</Link></span>

        </form>
      </div>
    </>
  )
}

export default Login;