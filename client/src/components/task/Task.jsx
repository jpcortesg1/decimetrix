import { useContext, useEffect, useState } from "react";
import Input from "./../input/Input";
import { Context } from "../../context/Context";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Task = ({ task, deleteTask }) => {
  const [status, setStatus] = useState("");
  const [currentStatus, setCurrentStatus] = useState(task?.status);
  const { token } = useContext(Context);
  const { typeUser } = jwt_decode(token);

  useEffect(() => {
    const changeState = async () => {
      try {
        if (status !== task.status && status !== "") {
          await axios.put(
            `https://afternoon-fortress-75389.herokuapp.com/tasks/status/${task.id}`,
            {
              status,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setCurrentStatus(status);
          toast.success(`Task ${task.message} updated successfully`, {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.SUCCESS,
          });
        }
      } catch (error) {
        toast.success(error.response.data.errors[0].msg, {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      }
    };
    changeState();
  }, [status, token, task]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://afternoon-fortress-75389.herokuapp.com/tasks/${task.id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      deleteTask(task.id);
      toast.success(`Task ${task.message} deleted successfully`, {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.SUCCESS,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-md-3 mx-1 mb-2">
      <ToastContainer />
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{task.users.username}</h5>
          <span className="card-title">{task.message}</span>
          <Input
            value={status}
            setValue={setStatus}
            type={"select"}
            label={"Edit status"}
            options={[
              ["todo", "To Do"],
              ["inprogress", "In Progress"],
              ["done", "Done"],
            ]}
          />
          {currentStatus === "todo" && (
            <div class="alert alert-danger">To Do</div>
          )}
          {currentStatus === "inprogress" && (
            <div class="alert alert-warning">In Progress</div>
          )}
          {currentStatus === "done" && (
            <div class="alert alert-success">Done</div>
          )}
          {typeUser === "admin" && (
            <button className="btn btn-danger me-4" onClick={handleDelete}>
              <i className="fa-solid fa-trash me-2"></i>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
