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
    // 
    useEffect(() => {
        const avatars = document.querySelectorAll(".userAvatar");

        avatars.forEach((a) => {
          const charCodeRed = a.dataset.label.charCodeAt(0);
          const charCodeGreen = a.dataset.label.charCodeAt(1) || charCodeRed;

          const red = (Math.pow(charCodeRed, 7) % 200) / 2;
          const green = red >= 25 ? (Math.pow(charCodeGreen, 7) % 200 ) / 2 : 35;
          const blue = ((green + red) % 200) * 3;
          a.style.background = `rgb(${red}, ${green}, ${blue})`;
        });
    }, [contacts]);
    // 

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
                            <div className='userAvatar' data-label={c.username[0]} >
                            </div>
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
