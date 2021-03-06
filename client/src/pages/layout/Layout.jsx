import { useContext } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./layout.css";

const Layout = ({ children }) => {
  const { token, dispatch } = useContext(Context);
  const { id, typeUser } = jwt_decode(token);

  const handleLogout = () => {
    console.log("token")
    dispatch({ type: "LOGOUT" });
  };
  return (
    <>
      <nav className="navbar navbar-dark bg-dark py-3 sticky-md-top">
        <div className="container d-flex">
          <Link className="link" to="/">
            <span className="navbar-brand fs-4" href="#">
              Decimetrix
            </span>
          </Link>

          <div className="d-flex align-items-center">
            <Link className="link" to="/profile">
              <span className="navbar-brand fs-4" href="#">
                Account
              </span>
            </Link>
            <button
              className="btn btn-dark navbar-brand fs-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="d-flex">
        <div className="col-md-2 sidebar bg-dark text-light shadow sticky-top">
          <div className="container pt-5">
            <div className="d-flex flex-column justify-content-center">
              {typeUser === "admin" && (
                <>
                  <Link className="link mb-2" to="/register">
                    <span className="navbar-brand fs-5">
                      <i className="fa-solid fa-user-plus me-2"></i>
                      New User
                    </span>
                  </Link>

                  <Link className="link mb-2" to="/createTask">
                    <span className="navbar-brand fs-5">
                      <i className="fa-solid fa-plus me-2"></i>
                      New Task
                    </span>
                  </Link>

                  <Link className="link mb-2" to="/tasks">
                    <span className="navbar-brand fs-5">
                      <i className="fa-solid fa-file me-2"></i>
                      Task Report
                    </span>
                  </Link>
                </>
              )}
              <Link className="link mb-2" to="/profile">
                <span className="navbar-brand fs-5">
                  <i className="fa-solid fa-user me-2"></i>
                  Profile
                </span>
              </Link>
              {typeUser === "operator" && (
                <>
                  <Link className="link mb-2" to={`/tasks/${id}`}>
                    <span className="navbar-brand fs-5">
                      <i className="fa-solid fa-file me-2"></i>
                      Task Report
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-10">
          <div className="container">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
