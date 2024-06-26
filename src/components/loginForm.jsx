import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../services/authService";
import Form from "../common/form";

const LoginForm = () => {
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string()
     .required()
     .label("Username"),
    password: Joi.string()
     .required()
     .label("Password")
  };

  const location = useLocation();

  const doSubmit = async () => {
    try {
      await auth.login(data.username, data.password);
      const { state } = location;
      window.location = state? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorsCopy = {...errors };
        errorsCopy.username = error.response.data;
        setErrors(errorsCopy);
        toast.error("Your credentials are not correct, please try again.");
      }
    }
  };

  useEffect(() => {
    if (auth.getCurrentUser()) {
      return <Navigate to="/" />;
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div class="card-deck mb-3" style={{ marginTop: "150px", display: 'flex', justifyContent:'center', alignItems:'center' }}>
          <div className="card mb-4 box-shadow"  style={{ width: "400px" }}>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">Please sign in</h1>
              <Form schema={schema} doSubmit={doSubmit} setData={setData} data={data} customStyle={"form-signin"}>
              {({ renderInput, renderButton }) => (
                  <>
                    {renderInput("username", "Username")}
                    {renderInput("password", "Password", "password")}
                    {renderButton("Login")}
                  </>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;