/* Project: TODO_LIST
Description: This is a simple todo list which gives you the functionality of adding new todo tasks, mark them as completed and remove the tasks. Total no of tasks are shown in the left drawer.
status: Complete
Pending: Add the functionality for editing the task, add validation in the title and the dates, add some more features like which task has the earliest end-date, total no. of tasks completed and the total no. of tasks remaining.
You can also add functionality of clciking the todo which will open up a modal window which shows the details of that todo, after this you can also add the edit todo functionality.
*/

import { useState } from "react";
import TodoList from "./components/TodoList";
import TodoContext from "./components/Context";
import CreateTodo from "./components/CreateTodo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <>
      <TodoContext.Provider value={{ todos, setTodos }}>
        <Router>
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/create-todo" element={<CreateTodo />} />
          </Routes>
        </Router>
      </TodoContext.Provider>
    </>
  );
}

export default App;
