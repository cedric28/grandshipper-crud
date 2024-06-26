import React, { useState } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import * as userService from '../services/userService';
import {toast} from 'react-toastify';
import auth from '../services/authService';

const RegisterForm = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
    name: ''
  });

  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .required(),
    name: Joi.string().required()
  };

  const doSubmit = async () =>{
    try {
      const response = await userService.register(data);
      console.log('response',response)
      auth.loginWithJWT(response?.data?.token);
      window.location = '/';
    } catch (error) {
      console.log('error',error)
      if(error.response && error.response.status === 400){
        const errorsCopy = {...errors};
        errorsCopy.username = error.response.data;
        setErrors(errorsCopy);
        toast.error(error.response.data);
      }
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div class="card-deck mb-3" style={{ marginTop: "150px", display: 'flex', justifyContent:'center', alignItems:'center'}}>
          <div className="card mb-4 box-shadow" style={{ width: "500px" }}>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">Registration</h1>
                <Form schema={schema} doSubmit={doSubmit} setData={setData} data={data}>
                  {({ renderInput, renderButton }) => (
                    <div>
                      <form>
                        {renderInput("username", "Username", "email")}
                        {renderInput("password", "Password", "password")}
                        {renderInput("name", "Name")}
                        {renderButton("Register")}
                      </form>
                    </div>
                  )}
                </Form>
                </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default RegisterForm;