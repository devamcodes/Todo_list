import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import TodoContext from "./Context";
import { useNavigate, Navigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
const drawerWidth = "240px";

let arr2 = [];
const styles = makeStyles(() => ({
  paper: {
    width: "100%",
    margin: "10px",
    height: "fit-content",
    paddingTop: "5px",
    backgroundColor: "#97BC62FF",
    justifySelf: "stretch",
    border: "1px solid black",
    boxShadow: "4px 3px #2C5F2D",
  },
  done: {
    marginRight: "10px",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#fff",
      color: "blue",
    },
  },
  remove: {
    backgroundColor: "red",
    fontWeight: 600,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
      color: "red",
    },
  },
  button: {
    borderRadius: "50%",
    boxShadow: "2px 1px black",
    color: "black",
    fontWeight: "bold",
    float: "right",
    // backgroundColor: "#2CDD67",
    "&:hover": { backgroundColor: "#DD2C57", boxShadow: "3px 2px black" },
  },
  edit: {
    backgroundColor: "#fff",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#318CBF",
      color: "#fff",
    },
  },
}));
function TodoList() {
  const { todos, setTodos } = useContext(TodoContext);
  let navigate = useNavigate();
  const classes = styles();
  const ondelete = (event, id) => {
    event.preventDefault();
    arr2 = todos.filter((ids) => ids.id !== id);
    let count = 0;
    // eslint-disable-next-line array-callback-return
    arr2.map((item) => {
      item.id = count;
      count++;
    });
    setTodos(arr2);
  };
  const btnClick = () => {
    navigate("/create-todo");
    <Navigate to="/create-todo" />;
  };

  const taskComplete = (i) => {
    let markedDoneTodo = todos.map((tasks) => {
      return tasks.id === i
        ? { ...tasks, isDone: !tasks.isDone }
        : { ...tasks };
    });

    setTodos(markedDoneTodo);
  };

  todos.sort(function (x, y) {
    return y.isDone === x.isDone ? 0 : x.isDone ? 1 : -1;
  });

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List
          style={{
            marginLeft: "20px",
            fontSize: "20px",
            fontStyle: "oblique",
            fontWeight: "bold",
            margin: "30px",
          }}
        >
          Total To-Dos:
          <br />
          <Chip
            label={todos.length}
            style={{
              backgroundColor: "grey",
              margin: "20px 20px",
              padding: "10px",
              color: "#fff",
              width: "5rem",
              height: "5rem",
              fontSize: 26,
            }}
          />
        </List>
        <Divider />
      </Drawer>
      ;
      <Box padding="10px 30px" marginLeft={drawerWidth}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={btnClick}
        >
          New
        </Button>
        <Table size="small">
          <TableHead>
            <TableRow>
              <Paper
                style={{
                  width: "100%",
                  margin: "10px",
                  justifySelf: "stretch",
                  border: "1px solid black",
                }}
              >
                <TableCell style={{ fontWeight: 600 }}>No.</TableCell>
                <TableCell style={{ width: "50ch", fontWeight: 600 }}>
                  Task
                </TableCell>{" "}
                {/*try using trunary for the width if there is title otherwise give some fixed size.*/}
                <TableCell style={{ width: "10ch", fontWeight: 600 }}>
                  StartDate
                </TableCell>
                <TableCell style={{ width: "10ch", fontWeight: 600 }}>
                  EndDate
                </TableCell>
                <TableCell style={{ width: "10ch", fontWeight: 600 }}>
                  Operations
                </TableCell>
              </Paper>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map(
              ({ id, isDone, title, description, startDate, endDate }, key) => {
                return (
                  <TableRow key={key} style={{ height: "80px" }}>
                    <Paper className={classes.paper}>
                      <TableCell style={{ fontWeight: 600 }}>
                        {id + 1}
                      </TableCell>
                      <TableCell style={{ width: "50ch", fontWeight: 600 }}>
                        <TableRow>
                          <span style={{ fontFamily: "lucida console" }}>
                            {title}
                          </span>
                          <p style={{ fontFamily: "courier new" }}>
                            {description}
                          </p>
                        </TableRow>
                      </TableCell>
                      <TableCell style={{ width: "10ch", fontWeight: 600 }}>
                        {startDate}
                      </TableCell>
                      <TableCell style={{ width: "10ch", fontWeight: 600 }}>
                        {endDate}
                      </TableCell>
                      <TableCell style={{ width: "230px" }}>
                        <Button
                          variant="contained"
                          className={classes.done}
                          color="primary"
                          startIcon={<DoneAllOutlinedIcon />}
                          onClick={() => taskComplete(id)}
                          disabled={isDone}
                        >
                          Done
                        </Button>
                        <Button
                          variant="contained"
                          // color="error"
                          className={classes.remove}
                          onClick={(event) => ondelete(event, id)}
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button className={classes.edit}>
                          <EditIcon />
                        </Button>
                      </TableCell>
                    </Paper>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

export default TodoList;
// {
//   /*    <List>
//             {todos.length > 0
//               ? todos.map(({ isDone }, index) => {
//                   <ListItem button key={index}>
//                     <div>
//                       <h3>
//                         Earliest DeadLine:
//                         {todos.sort(function (d1, d2) {
//                           return d1 > d2 ? d1 : d2;
//                         })}
//                       </h3>
//                     </div>
//                     <div>
//                       <h3>Tasks Remaining: </h3>
//                       {!isDone ? todos.length - todos.isDone.count() : 0}
//                     </div>
//                     <h3>
//                       Tasks Completed:
//                       {isDone ? todos.length - todos.isDone.count() : 0}
//                     </h3>
//                     <ListItemText primary={index} />
//                   </ListItem>;
//                 })
//               : null}
//           </List> */
// }
