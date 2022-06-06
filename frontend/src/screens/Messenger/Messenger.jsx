import styles from './Messenger.module.scss';
import Header from '../../components/Header/Header';
import ChatTalk from '../../components/ChatTalk/ChatTalk';
import ChatMessage from '../../components/ChatMessage/ChatMessage';
import { TextareaAutosize, Button, Input } from '@mui/material';
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { io } from 'socket.io-client';

const Messenger = () => {
  const socket = useRef(io('ws://localhost:8800'));
  const [talks, setTalks] = useState([]);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [liveMessage, setLiveMessage] = useState('');
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const chatScroll = useRef();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    socket.current = io('ws://localhost:8800');
    socket.current.on('receiveMsg', (data) => {
      setIncomingMessage({
        senderID: data.senderID,
        message: data.msg,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    incomingMessage &&
      chat?.members.includes(incomingMessage.senderID) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, chat?.members]);

  useEffect(() => {
    socket.current.emit('addUser', user?._id);
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(
        user.following.filter((uf) => users.some((u) => u.userID === uf))
      );
    });
  }, [user]);

  useEffect(() => {
    const fetchTalks = async () => {
      try {
        const { data } = await axios.get(`/api/talk/${user?._id}`);
        setTalks(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTalks();
  }, [user._id]);

  useEffect(() => {
    if (chat) {
      const fetchMessages = async () => {
        try {
          const { data } = await axios.get(`/api/message/${chat?._id}`);
          setMessages(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchMessages();
    }
  }, [chat]);

  useEffect(() => {
    chatScroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendBtnHandler = async (e) => {
    e.preventDefault();
    const msg = {
      senderID: user._id,
      talkID: chat._id,
      message: liveMessage,
    };

    const receiverID = chat.members.find((m) => m !== user._id);

    socket.current.emit('sendMsg', {
      senderID: user._id,
      receiverID,
      msg: liveMessage,
    });

    try {
      const { data } = await axios.post(`/api/message`, msg);
      setMessages([...messages, data]);
      setLiveMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.wrapper}>
            <Input className={styles.input} placeholder="Search friends..." />
            {talks &&
              talks.map((talk) => (
                <div key={talk._id} onClick={() => setChat(talk)}>
                  <ChatTalk talk={talk} user={user} />
                </div>
              ))}
          </div>
        </div>
        <div className={styles.center}>
          {chat ? (
            <div className={styles.wrapper}>
              <div className={styles.top}>
                {messages &&
                  messages.map((msg) => (
                    <div key={msg.createdAt} ref={chatScroll}>
                      <ChatMessage
                        message={msg}
                        self={msg.senderID === user._id}
                      />
                    </div>
                  ))}
              </div>
              <div className={styles.bottom}>
                <TextareaAutosize
                  maxRows={3}
                  className={styles.textArea}
                  onChange={(e) => setLiveMessage(e.target.value)}
                  value={liveMessage}
                />
                <Button
                  variant="contained"
                  className={styles.btn}
                  type="submit"
                  size="small"
                  color="success"
                  onClick={sendBtnHandler}
                >
                  Send
                </Button>
              </div>
            </div>
          ) : (
            <div className={styles.wrapper}>
              <div className={styles.chatBg}>
                Open a chat to start messaging.
              </div>
            </div>
          )}
        </div>
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentUser={user._id}
              setChat={setChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
