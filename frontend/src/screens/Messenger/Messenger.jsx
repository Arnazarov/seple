import styles from './Messenger.module.scss';
import Header from '../../components/Header/Header';
import ChatTalk from '../../components/ChatTalk/ChatTalk';
import ChatMessage from '../../components/ChatMessage/ChatMessage';
import { TextareaAutosize, Button, Input } from '@mui/material';
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Messenger = () => {
  const [talks, setTalks] = useState([]);

  const { user } = useContext(AuthContext);

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
  }, [user]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.wrapper}>
            <Input className={styles.input} placeholder="Search friends..." />
            {talks &&
              talks.map((talk) => (
                <ChatTalk key={talk._id} talk={talk} user={user} />
              ))}
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.wrapper}>
            <div className={styles.top}>
              <ChatMessage />
            </div>
            <div className={styles.bottom}>
              <TextareaAutosize maxRows={3} className={styles.textArea} />
              <Button
                variant="contained"
                className={styles.btn}
                type="submit"
                size="small"
                color="success"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
