import Layout from "./components/layout";
import ListChats from "./components/listChats";
import ChatContainer from "./components/chatContainer";
import Box from "@mui/material/Box";

function App() {
  return (
    <Layout>
      {" "}
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: 300,
            border: 1,
          }}
        >
          <ListChats />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <ChatContainer />
        </Box>
      </Box>
    </Layout>
  );
}

export default App;
