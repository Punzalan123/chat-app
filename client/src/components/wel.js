import React from 'react';
import './components.css';

export const Wel = ({current}) => {
  return (
    <div className='welcomeCon'>
        <h1>{`Welcome ${current.username}`}!</h1>
        <h3>Select a chat</h3>
    </div>
  )
}
