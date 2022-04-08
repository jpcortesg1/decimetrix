import { useContext, useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { Context } from "../../context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../components/input/Input";

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
          <Input
            value={email}
            setValue={setEmail}
            type={"email"}
            label={"Email"}
          />
          <Input
            value={typeUser}
            setValue={setTypeUser}
            type={"select"}
            label={"Type of user"}
            options={[["admin", "Admin"], ["operator", "Operator"]]}
          />
          <button type="submit" className={`btn btn-dark`}>
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
