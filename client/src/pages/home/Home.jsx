import { useContext } from "react";
import { Context } from "../../context/Context";
import jwt_decode from "jwt-decode";
import Layout from "../layout/Layout";

const Home = () => {
  const { token } = useContext(Context);
  const { typeUser } = jwt_decode(token);

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <h1 className="text-center my-5">Decimetrix</h1>
        <div className="container">
          <p>
            This is an app for assigning and controlling tasks to different
            users. You can manage all tasks and manage their status.
          </p>
          <h3>You Can:</h3>
          <ul>
            {typeUser === "admin" && (
              <>
                <li>Create new users.</li>
                <li>Create new task for any user.</li>
              </>
            )}
            <li>View all assigned tasks</li>
            <li>Change the status of a task</li>
            <li>See your data, and update</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
