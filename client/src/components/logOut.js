import React from 'react';
import { useNavigate } from 'react-router-dom';
import './components.css';
import {BiLogOut as Lo} from 'react-icons/bi';


export const LogOut = () => {

    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.clear();
        navigate('/login');
    }

  return (
    <button className='logOutBtn' onClick={handleClick}>
        Sign Out <Lo />
    </button>
  )
}
