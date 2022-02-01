import Box from "@mui/material/Box";
import ChatContainerHeader from "./chatHeader";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const ChatContainer = ({ socket, userName, messageTo }) => {
  return (
    <Box sx={{}}>
      <ChatContainerHeader userName={userName} userId={messageTo} />
      <Box sx={{ height: 550 }}></Box>
      <Box
        sx={{
          display: "flex",
          m: 1,
        }}
      >
        <TextField fullWidth label="Enter a message.." id="fullWidth" />
        <Button
          variant="contained"
          color="success"
          sx={{ pl: 3, pr: 3, ml: 1 }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatContainer;
