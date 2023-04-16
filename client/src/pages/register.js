import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './pages.css';
import {BsChatDotsFill as ChatIcon} from 'react-icons/bs';
import axios from 'axios';
import { registerRoute } from '../utils/API_Routes';



const Register = () => {

  const navigate = useNavigate();

  const [val, setVal] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if(localStorage.getItem('chat-app-user')) {
      navigate('/');
    };
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if(handleValid()){
      const { username, email, password } = val;
      const {data} = await axios.post(registerRoute, {
        username,
        email,
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
    const { username, password, confirmPassword } = val;
    if(password !== confirmPassword){
      alert("Password confirmation doesn't match!");
      return false;
    }else if(username.length<3){
      alert("Username should be at least 3 characters!");
      return false;
    }else if(password.length<=7){
      alert("Password should be at least 8 characters!");
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
            required
          />
          
          <input 
            type='email' 
            placeholder='Email' 
            name='email' 
            onChange={e => handleChange(e)}
            required
          />

          <input 
            type='password' 
            placeholder='Password' 
            name='password' 
            onChange={e => handleChange(e)}
            required
          />
          
          <input 
            type='password' 
            placeholder='Confirm Password' 
            name='confirmPassword' 
            onChange={e => handleChange(e)}
            required
          />

          <button type='submit'>REGISTER</button>
          <span>Already have an account? <Link to="/login">Login</Link></span>

        </form>
      </div>
    </>
  )
}

export default Register;



// Before running server
// open cmd 
// type 'mongod' command 
// open mongosh
// type 'mongodb://localhost:27017' and hit enter
// you can run server now 