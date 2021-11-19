import React, { useState, useContext } from "react";
import TodoContext from "./Context";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, Navigate } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
  const { todos, setTodos } = useContext(TodoContext);
  let navigate = useNavigate();

  const [createTodo, setCreateTodo] = useState({
    id: "",
    title: "",
    startDate: "",
    endDate: "",
    isDone: false,
  });
  const handleSubmit = (event) => {
    event.preventDefault();

    let Arr = [];
    Arr = [...todos];
    createTodo.id = Arr.length;
    Arr.push(createTodo);
    setTodos(Arr);
    console.log(`createTodo`, createTodo);
    navigate("/");
    <Navigate to="/" />;
  };
  const newtodo = (event) => {
    const { name, value } = event.target;
    setCreateTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          style={{ border: "2px solid black" }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PlaylistAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            New Todo
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container>
              <Grid
                item
                style={{
                  display: "flex",
                  padding: "10px",
                }}
              >
                <div>
                  <Typography minWidth="fit-content">Start Date:</Typography>
                  {/* <DatePicker */}
                  <TextField
                    label="Satrt Date"
                    selected={createTodo.startDate}
                    name="startDate"
                    onChange={newtodo}
                  />
                </div>
              </Grid>
              <Grid
                item
                style={{
                  display: "flex",
                  padding: "10px",
                }}
              >
                <div>
                  <Typography minWidth="fit-content">End Date:</Typography>
                  {/* <DatePicker */}
                  <TextField
                    label="End Date"
                    selected={createTodo.endDate}
                    name="endDate"
                    onChange={newtodo}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Task Title"
                  name="title"
                  onChange={newtodo}
                  autoComplete="title"
                  style={{ zIndex: 0 }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              margin="20px"
            >
              Create New Todo
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
