import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Context } from "./context/Context";
import jwt_decode from "jwt-decode";
import Home from "./pages/home/Home";
import Layout from "./pages/layout/Layout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CreateTask from "./pages/createTask/CreateTask";

function App() {
  const { token } = useContext(Context);
  let typeUser;
  if (token) {
    const decode = jwt_decode(token);
    typeUser = decode.typeUser;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          ></Route>
          <Route
            path="/"
            element={token ? <Layout /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/register"
            element={
              token && typeUser === "admin" ? <Register /> : <Navigate to="/" />
            }
          ></Route>
          <Route
            path="/createTask"
            element={
              token && typeUser === "admin" ? (
                <CreateTask />
              ) : (
                <Navigate to="/" />
              )
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
