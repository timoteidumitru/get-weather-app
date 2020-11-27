import React from "react";

const Form = (props) => (
  <div>
    <form className="form-main" onSubmit={props.getWeather}>
      <input type="text" name="city" placeholder="Enter a city..." />
      <input type="text" name="country" placeholder="Enter country..." />
      <button>Get Weather</button>
    </form>
  </div>
);

export default Form;
