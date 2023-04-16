import React, { useState, useEffect, useRef } from 'react';
import './pages.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Contacts } from '../components/contacts';
import { allUsersRoute, host } from '../utils/API_Routes';
import { Wel } from '../components/wel';
import { ChatCon } from '../components/chatCon';
import { io } from 'socket.io-client';

function Chat() {

  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [current, setCurrent] = useState(undefined);
  const [chat, setChat] = useState(undefined);
  const [isL, setIsl] = useState(false);


  const handleChat = c => {
    setChat(c);
  };

  useEffect(() => {
    async function fetchData1() {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrent(await JSON.parse(localStorage.getItem('chat-app-user')));
        setIsl(true);
      }
    }
    fetchData1();
  }, []);

  useEffect(() => {
    if (current) {
      socket.current = io(host);
      socket.current.emit("add-user", current._id);
    }
  }, [current]);

  useEffect(() => {
    async function fetchData() {
      if (current) {
        const data = await axios.get(`${allUsersRoute}/${current._id}`);
        setContacts(data.data);
      }
    }
    fetchData();
  }, [current]);


  return (
    <div className='mainCon'>
      <div className='childCon'>
        <Contacts contacts={contacts} current={current} chat={handleChat} />
        {
          isL && chat === undefined ? <Wel current={current} /> : <ChatCon current={chat} currentUser={current} socket={socket} />
        }
      </div>
    </div>
  )
}
// change '{current}' to chat later 
export default Chat;