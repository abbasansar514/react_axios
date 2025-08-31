import { Posts } from "./components/posts";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const App = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            textAlign="center"
            sx={{ flexGrow: 1 }}
          >
            Rest API Using Axios | CRUD Operations
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Posts data  */}
      <Posts></Posts>
    </Box>
  );
};
export default App;
