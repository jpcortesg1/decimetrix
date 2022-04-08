import Layout from "./../layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../components/input/Input";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import jwt_decode from "jwt-decode";
import axios from "axios";

const CreateTask = () => {
  const { token } = useContext(Context);
  const { id } = jwt_decode(token);
  const [message, setMessage] = useState("");
  const [operator, setOperator] = useState("");
  const [status, setStatus] = useState("");
  const [operators, setOperators] = useState([]);

  useEffect(() => {
    const getOperators = async () => {
      try {
        const { data } = await axios.get("/users/operators", {
          headers: { authorization: `Bearer ${token}` },
        });
        setOperators(data.map((user) => [user.id, user.username]));
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getOperators();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/tasks",
        {
          message,
          status,
          createdBy: id,
          assignedTo: operator,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const user = operators.find((op) => op[0] === parseInt(operator));
      toast.success(`new featured task for ${user[1]}`, {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.SUCCESS,
      });
      setMessage("");
    } catch (error) {
      toast.success(error.response.data.errors[0].msg, {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.ERROR,
      });
    }
  };
  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="text-center my-5">Create New Task</h1>
        <form onSubmit={handleSubmit}>
          <Input
            value={operator}
            setValue={setOperator}
            type={"select"}
            label={"User to will do the task"}
            options={operators}
          />
          <Input
            value={message}
            setValue={setMessage}
            type={"text"}
            label={"Description of task"}
          />
          <Input
            value={status}
            setValue={setStatus}
            type={"select"}
            label={"Status of the task"}
            options={[
              ["todo", "To Do"],
              ["inprogress", "In Progress"],
              ["done", "Done"],
            ]}
          />
          <button type="submit" className={`btn btn-dark`}>
            Create
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateTask;
