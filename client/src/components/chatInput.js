import React, {useState} from 'react';
import './components.css';
import {MdSend as Send} from 'react-icons/md';

export const ChatInput = ({handleSnM}) => {

    const [msg, setMsg] = useState('');

    const sendChat = e => {
        e.preventDefault();
        if(msg.length>0){
            handleSnM(msg);
            setMsg('');
        }
    }

  return (
    <div className='ChatInputContainer'>
        <form className='ForminputContainer' onSubmit={e => sendChat(e)}>
            <input 
                type='text'
                placeholder='Message...' 
                value={msg}
                onChange={e => setMsg(e.target.value)}
            />
            <button className='ChatSubmit' disabled={msg.length > 1 ? false : true }>
                <Send />
            </button>
        </form>
    </div>
  )
}
