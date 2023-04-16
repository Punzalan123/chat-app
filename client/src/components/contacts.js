import React, { useState, useEffect } from 'react';
import './components.css';
import {BsChatDotsFill as ChatIcon} from 'react-icons/bs';
import { LogOut } from './logOut';

export const Contacts = ({contacts, current, chat}) => {

    const [name, setName] = useState(undefined);
    const [select, setSelect] = useState(undefined);


    useEffect(() => {
        if(current){
            setName(current.username);

        }
    }, [current]);

    const changeChat = (i, c) => {
        setSelect(i);
        chat(c);
    };


  return <React.Fragment>
    {
     name && (
        <div className='contactsContainer'>
            <div className='brand'>
                <h1><ChatIcon /> CHAT APP</h1>
            </div>
            <div className='contactsList'>
                {
                    contacts.map((c, i) => (
                        <div 
                        className={`contact ${i === select ? 'selected' : '' }`} 
                        key={i}
                        onClick={() => changeChat(i, c)}
                        >
                            <div className='username'>
                                <h3>{c.username}</h3>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='currentUser'>
                <div className='username'>
                    <h2>{name}</h2>
                </div>
                <LogOut />
            </div>
        </div>
     )  
    }
  </React.Fragment>
}
