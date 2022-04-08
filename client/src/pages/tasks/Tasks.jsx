import { useContext, useEffect, useState } from "react";
import Layout from "./../layout/Layout";
import { Context } from "../../context/Context";
import axios from "axios";
import Task from "../../components/task/Task";
import jwt_decode from "jwt-decode";

const Tasks = () => {
  const { token } = useContext(Context);
  const { id, typeUser } = jwt_decode(token);
  const [tasks, setTasks] = useState([]);

  const deleteTask = (id) => {
    const index = tasks.findIndex((task) => {
      return task.id === id;
    });
    const currentTasks = [...tasks];
    currentTasks.splice(index, 1);
    setTasks([...currentTasks]);
  };

  useEffect(() => {
    const getTasks = async () => {
      let result;
      if (typeUser === "operator")
        result = await axios.get(`https://afternoon-fortress-75389.herokuapp.com/tasks/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      if (typeUser === "admin")
        result = await axios.get("/tasks", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      setTasks(result.data);
    };
    getTasks();
  }, [token, id, typeUser]);

  return (
    <Layout>
      <div className="col-md-10 offset-md-1">
        <h1 className="text-center my-5">Tasks Report</h1>
        <div className="d-flex flex-wrap justify-content-around">
          {tasks.map((task) => (
            <Task key={task.id} task={task} deleteTask={deleteTask} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;
