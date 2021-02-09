import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingButton from "../common/LoadingButton";
import "./Auth.css";

const Login = () => {
  const { state, loginUser } = useContext(AuthContext);
  const { msg, isLoading, isAuthenticated, success } = state;
  toast.configure();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const onChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const body = { email: values.email, password: values.password };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(body);
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/userDashBoard");
      toast.info("Login Successful");
      window.location.reload();
    }
  }, [isAuthenticated]);

  return (
    <div>
      <div className="form">
        <h1>Log in</h1>
        {msg !== "" && !isAuthenticated && toast.error(msg.message || msg)}
        <div className="layer">
          <form
            onSubmit={handleSubmit}
            style={{
              boxShadow:
                msg !== "" &&
                success === false &&
                " 0 0 10px rgba(196, 12, 12, 0.5)",
            }}
          >
            <label htmlFor="email">Email</label>
            <input
              type="text"
              onChange={onChange}
              name="email"
              placeholder="Email address"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={onChange}
            />
            {isLoading ? (
              <LoadingButton />
            ) : (
              <button className="submit-btn">Submit</button>
            )}

            <p>
              Do not have an account ? <Link to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
