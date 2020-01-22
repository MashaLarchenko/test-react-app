import React, { useState, useEffect  } from "react";
import PropTypes from "prop-types";
import Context from "../context";

const style = {
  form: {
    marginTop: "1rem",
    textAlign: "center",
  },
  button: {
    marginLeft: '2%',
    background: 'rgb(155, 98, 95)',
    width: '7%',
    height: '30px',
    borderRadius: '8px',
    border: 'antiquewhite'
  },
  input: {
    width: '20%',
    height: '20px'
  }
};

function useInputValue(dafaultVal = "") {
  const [value, setValue] = useState(dafaultVal);
  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
    clear: () => setValue(""),
    value: () => value
  };
}

function AddToDo({ onCreate }) {
  const input = useInputValue("");
  
  function submitHandler(event) {
    event.preventDefault();

    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
    }
  }

  return (
    <form style={style.form} onSubmit={submitHandler}>
      <input {...input.bind} style={style.input}/>
      <button type="submit" style={style.button}> Add todo</button>
    </form>
  );
}

AddToDo.propTypes = {
  onCreate: PropTypes.func.isRequired
};

export default AddToDo;
