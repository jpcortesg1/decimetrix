import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Context } from "./context/Context";
import Home from "./pages/home/Home";
import Layout from "./pages/layout/Layout";
import Login from "./pages/login/Login";

function App() {
  const { token } = useContext(Context);
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
