import { useContext, useEffect, useState } from "react";
import "./profile.css";
import { Context } from "../../context/Context";
import Layout from "./../layout/Layout";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../components/input/Input";

const Profile = () => {
  const PF = process.env.REACT_APP_PF;
  const { token } = useContext(Context);
  const { id } = jwt_decode(token);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`https://afternoon-fortress-75389.herokuapp.com/users/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
        setUsername(data.username);
        setEmail(data.email);
        setImage(
          data.image !== "no-avatar.png"
            ? data.image.substring(data.image.lastIndexOf("/"))
            : data.image
        );
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getUser();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", username);
    data.append("email", email);
    if (password !== "") data.append("password", password);
    if (typeof image === "object") data.append("photo", image);
    try {
      await axios.put(`https://afternoon-fortress-75389.herokuapp.com/users/${id}`, data, {
        headers: { authorization: `Bearer ${token}` },
      });
      toast.success(`User ${username} updated successfully`, {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.SUCCESS,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="text-center my-5">Updated Info for{user?.username}</h1>
        <form onSubmit={handleUpdate}>
          <Input
            value={username}
            setValue={setUsername}
            type={"text"}
            label={"Username"}
          />
          <div className="mb-3">
            <label className="form-label w-100">
              Password
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="off"
              />
            </label>
          </div>
          <Input
            value={email}
            setValue={setEmail}
            type={"email"}
            label={"Email"}
          />

          <div className="image d-flex justify-content-center mb-3">
            <img
              src={
                typeof image === "object"
                  ? URL.createObjectURL(image)
                  : PF + image
              }
              alt=""
              className="imageProfile"
            />

            <label>
              <i className="fa-solid fa-pencil text-dark fs-5 editImage"></i>
              <input
                type="file"
                className="imageInput"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>

          <button type="submit" className="btn btn-dark mb-5">
            Updated Info
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
