import { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../components/input/Input";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const { data } = await axios.post("https://afternoon-fortress-75389.herokuapp.com/auth/login", {
        username,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      toast.success(error.response.data.errors[0].msg, {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.ERROR,
      });
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="row my-5">
        <h1 className="text-center">Decimetrix</h1>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <Input
              value={username}
              setValue={setUsername}
              type={"text"}
              label={"Username"}
            />
            <Input
              value={password}
              setValue={setPassword}
              type={"password"}
              label={"Password"}
            />
            <button
              type="submit"
              className={`btn btn-dark ${isFetching && "disabled"}`}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
