import { Alert } from '@mui/material';

const Message = ({ msg, severity }) => {
  return <Alert severity={severity}>{msg}</Alert>;
};

export default Message;
