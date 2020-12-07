import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { showErrorMsg, showSuccessMsg } from "./helper/message";
import { showLoading } from "./helper/loading";
import { signin } from "./api/auth";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    actor: "doctor",
    errMsg: false,
    loading: false,
    redirectToDashboard: false,
  });

  //destructuring state
  const { email, password, errMsg, loading, redirectToDashboard } = formData;

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errMsg: "",
    });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();

    // client-side validation
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errMsg: "Invalid email",
      });
    } else {
      const { email, password } = formData;
      const data = { email, password };

      setFormData({
        ...formData,
        loading: true,
      });

      signin(data, formData.actor)
        .then((res) => {
          localStorage.setItem("token", res.data.token);

          if (res.data.role === "doctor") {
            history.push("/doctor/home");
          } else if (res.data.role === "hospital") {
            history.push("/hospital/home");
          }
        })
        .catch((err) => {
          setFormData({
            ...formData,
            errMsg: "Invalid Credentials",
          });
        });
    }
  };

  const showSignInForm = () => (
    <form className="signup-form" onSubmit={handleSubmit}>
      {/* {email} */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-envelope"></i>
          </span>
        </div>
        <input
          name="email"
          value={email}
          className="form-contorl"
          placeholder="Email Address"
          type="text"
          onChange={handleChange}
        />
      </div>
      {/* {password} */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <input
          name="password"
          value={password}
          className="form-contorl"
          placeholder="Create password"
          type="password"
          onChange={handleChange}
        />
      </div>

      <label>Sign in As: </label>
      <select value={formData.actor} name="actor" onChange={handleChange}>
        <option value="doctor" name="doctor">
          Doctor
        </option>
        <option value="hospital" name="hospital">
          Hospital
        </option>
      </select>

      {/* signin button */}
      <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block">
          SignIn
        </button>
      </div>
    </form>
  );

  /***********************************
   * Renderer
   ***********************************/
  return (
    <>
      <div className="signup-container">
        <div className="row px-3  vh-100">
          <div className="col-md-5 mx-auto align-self-center">
            <h1>
              <strong style={{ textAlign: "center" }}>Medical Portal</strong>
            </h1>
            {errMsg && showErrorMsg(errMsg)}
            {loading && <div className="text-center">{showLoading()}</div>}
            {showSignInForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
