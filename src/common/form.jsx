import React, { useState } from "react";
import Input from "./input";
import ListBox from "./listBox";
import Joi from "joi-browser";

const Form = ({data ,customStyle, setData, schema, doSubmit, children}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  console.log('validate',validate())
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const propertySchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, propertySchema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    doSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    const errorMessage = validateProperty(input);
    const errorsCopy = {...errors };
    if (errorMessage) {
      errorsCopy[input.name] = errorMessage;
    } else {
      delete errorsCopy[input.name];
    }
    setErrors(errorsCopy);
  
    const newData = {...data, [input.name]: input.value };
    setData(newData);
  };

  const renderButton = (label) => {
    return (
      <button onClick={handleSubmit} disabled={validate()} className="mt-2 btn btn-md btn-primary btn-block form-control">
        {label}
      </button>
    );
  };

  const renderInput = (name, label, type = "text", placeholder) => {
    return (
      <Input
        name={name}
        label={label}
        type={type}
        error={errors[name]}
        value={data[name]}
        onChange={handleChange}
        placeholder={placeholder}
      />
    );
  };

  const renderListBox = (name, label, options) => {
    return (
      <ListBox
        name={name}
        label={label}
        options={options}
        value={data[name]}
        error={errors[name]}
        onChange={handleChange}
      />
    );
  };

  return (
    <form className={customStyle} onSubmit={handleSubmit}>
      {children({
        renderInput,
        renderListBox,
        renderButton,
      })}
    </form>
  );
};

export default Form;
