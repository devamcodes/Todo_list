import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import TodoContext from "./Context";
import { useNavigate, Navigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
const drawerWidth = "240px";

let arr2 = [];
function TodoList() {
  const { todos, setTodos } = useContext(TodoContext);
  let navigate = useNavigate();

  const ondelete = (event, id) => {
    event.preventDefault();
    arr2 = todos.filter((ids) => ids.id !== id);
    let count = 0;
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
      <div>
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
            }}
          >
            Total Todos:
            <Chip
              label={todos.length}
              style={{ marginLeft: "20px" }}
              color="primary"
            />
          </List>
          <Divider />
          {/*    <List>
            {todos.length > 0
              ? todos.map(({ isDone }, index) => {
                  <ListItem button key={index}>
                    <div>
                      <h3>
                        Earliest DeadLine:
                        {todos.sort(function (d1, d2) {
                          return d1 > d2 ? d1 : d2;
                        })}
                      </h3>
                    </div>
                    <div>
                      <h3>Tasks Remaining: </h3>
                      {!isDone ? todos.length - todos.isDone.count() : 0}
                    </div>
                    <h3>
                      Tasks Completed:
                      {isDone ? todos.length - todos.isDone.count() : 0}
                    </h3>
                    <ListItemText primary={index} /> 
                  </ListItem>;
                })
              : null}
          </List> */}
        </Drawer>
      </div>
      ;
      <Box padding="10px 30px" marginLeft={drawerWidth}>
        <Button
          variant="contained"
          color="success"
          style={{ float: "right" }}
          onClick={btnClick}
        >
          New
        </Button>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Task</TableCell>
              <TableCell>StartDate</TableCell>
              <TableCell>EndDate</TableCell>
              <TableCell>Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map(({ id, isDone, title, startDate, endDate }, key) => {
              return (
                <TableRow key={key}>
                  <TableCell>{id + 1}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{startDate}</TableCell>
                  <TableCell>{endDate}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      style={{ marginRight: "10px" }}
                      startIcon={<DoneAllOutlinedIcon />}
                      onClick={() => taskComplete(id)}
                      disabled={isDone}
                    >
                      Done
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(event) => ondelete(event, id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

export default TodoList;
