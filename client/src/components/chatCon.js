import React, { useState, useEffect, useRef } from 'react';
import './components.css';
import { ChatInput } from './chatInput';
import axios from 'axios';
import { getAllMessage, sendMessage } from '../utils/API_Routes';
import {BsFillCameraVideoFill as Vid, BsFillTelephoneFill as Call} from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

export const ChatCon = ({ current, currentUser, socket }) => {

    const [msg, setMsg] = useState([]);
    const [arrMsg, setArrMsg] = useState(null);

    const scrollRef = useRef();

    useEffect(() => {
        async function fd() {
            const response = await axios.post(getAllMessage, {
                from: currentUser._id,
                to: current._id,
            });
            setMsg(response.data);
        };
        if(current){fd()}
    }, [current]);

    const handleSnM = async (m) => {
        await axios.post(sendMessage, {
            from: currentUser._id,
            to: current._id,
            message: m,
        });
        socket.current.emit("send-msg", {
           to: current._id,
           from: currentUser._id,
           message: m, 
        });

        const msgs = [...msg];
        msgs.push({fromSelf: true, message: m, });
        setMsg(msgs);
    };

    useEffect(() => {
        if(socket.current){
            socket.current.on("msg-received", (m) => {
                setArrMsg({fromSelf:false, message: m, })
            })
        }
    }, []);

    useEffect(() => {
        arrMsg && setMsg((p) => [...p, arrMsg]);
    }, [arrMsg]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"});
    }, [msg]);

    return (
        <React.Fragment>
            {
                current && (

                    <div className='chatCon'>
                        <div className='chatHeader'>
                            <div className='userDetails'>
                                <div className='userName'>
                                    <h3>{current.username}</h3>
                                </div>
                            </div>
                            <span>
                                <Vid />
                                <Call />
                            </span>
                        </div>
                        <div className='chatMessages'>
                            {
                                msg.map((m) => (
                                    <div key={uuidv4()} ref={scrollRef}>
                                        <div className={`message ${m.fromSelf ? "sent" : "received"}`}>
                                            <div className='messageContent'>
                                                <p>{m.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                        <ChatInput handleSnM={handleSnM} />
                    </div>

                )
            }
        </React.Fragment>
    )
}
