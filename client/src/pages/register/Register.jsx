import { useContext, useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { Context } from "../../context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { token } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [typeUser, setTypeUser] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/auth/register",
        {
          username,
          password,
          email,
          typeUser,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`User ${data.username} created successfully`, {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.SUCCESS,
      });
      setPassword("");
      setUsername("");
      setEmail("");
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
        <h1 className="text-center my-5">Register New User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="Email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              autoComplete="off"
            />
          </div>
          <div className=" mb-3">
            <label className="form-label" htmlFor="typeUser">
              Options
            </label>
            <select
              className="form-select"
              id="typeUser"
              onChange={(e) => {
                setTypeUser(e.target.value);
              }}
            >
              <option defaultValue>Select value</option>
              <option value="operator">Operator</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className={`btn btn-dark`}>
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
