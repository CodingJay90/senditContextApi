import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.css";
import LoadingButton from "../common/LoadingButton";
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
  //grab values from context
  const { state, registerUser, clearErrors } = useContext(AuthContext);
  const { errors, isLoading, msg, success, isAuthenticated } = state; //destructure values from state

  console.log(errors);
  toast.configure();

  const [values, setValues] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_no: "",
  });

  const body = {
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    phone_no: values.phone_no,
    password: values.password,
  };
  const history = useHistory();
  const onChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    registerUser(body);
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/userDashBoard");
      toast.info("Sign Up Successful");
      // window.location.reload();
    }
  }, [isAuthenticated]);

  return (
    <div>
      <div className="form">
        <h1>Sign Up</h1>
        {errors &&
          errors.map((error) => {
            return toast.error(error.msg);
          })}
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
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              onChange={onChange}
              name="first_name"
              placeholder="First Name"
            />
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              onChange={onChange}
              name="last_name"
              placeholder="Last Name"
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              onChange={onChange}
              name="email"
              placeholder="Email address"
            />
            <label htmlFor="phone_no">Mobile No</label>
            <input
              type="text"
              onChange={onChange}
              name="phone_no"
              placeholder="Mobile no"
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
              Already had an account ? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
