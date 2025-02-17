import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box, makeStyles } from "@material-ui/core";
import Tasks from "./pages/Tasks";
import Main from "./pages/Main";
import Statistics from "./pages/Statistics";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

const useStyles = makeStyles({
  root: {
    width: "70vw",
    margin: "0 auto",
    flex: "1 0 auto",
  },
});

const USER = "User";
const TASKS = "Tasks";

const App = () => {
  const classes = useStyles();
  const localStorageUser = localStorage.getItem(USER);
  const localStorageTasks = localStorage.getItem(TASKS);
  const [user, setUser] = useState(
    localStorageUser ? JSON.parse(localStorageUser) : {}
  );
  const [tasks, setTasks] = useState(
    localStorageTasks ? JSON.parse(localStorageTasks) : []
  );

  const onSubmitUser = (data) => {
    setUser(data);
    localStorage.setItem(USER, JSON.stringify(data));
  };

  const onSubmitTasks = (data) => {
    const newData = { ...data, id: tasks.length + 1 };
    const updatedTasks = [...tasks, newData];
    setTasks(updatedTasks);
    localStorage.setItem(TASKS, JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem(TASKS, JSON.stringify(updatedTasks));
  };

  return (
    <Router>
      <Box className={classes.root}>
        <Header onSubmitUser={onSubmitUser} name={user.name} />
        <Switch>
          <Route exact path="/">
            <Main
              name={user.name}
              tasks={tasks}
              onSubmitTasks={onSubmitTasks}
              deleteTask={deleteTask}
            />
          </Route>
          <Route path="/tasks">
            <Tasks tasks={tasks} />
          </Route>
          <Route path="/statistics">
            <Statistics />
          </Route>
        </Switch>
      </Box>
      <Footer />
    </Router>
  );
};

export default App;
