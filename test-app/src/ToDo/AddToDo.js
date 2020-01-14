import React, { useState } from "react";
import PropTypes from "prop-types";
import Context from "../context";

const style = {
  form: {
    marginTop: "1rem"
  }
};

function AddToDo({ onCreate }) {
  const [value, setValue] = useState("");

  function submitHandler(event) {
    event.preventDefault();

    if (value.trim()) {
      onCreate(value);
      setValue(' ')
    }
  }
  return (
    <form style={style.form} onSubmit={submitHandler}>
      <input value={value} onChange={event => setValue(event.target.value)} />
      <button type="submit">Add todo</button>
    </form>
  );
}

AddToDo.propTypes = {
  onCreate: PropTypes.func.isRequired
};

export default AddToDo;
