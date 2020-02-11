import React from "react";

const Weather = props => {
  return (
    <div className="container text-light">
      <div className="cards pt-4">
        <h2>Current Weather</h2>
        <h1>{props.city}</h1>
        <h5 className="py-4">
          {/* <i className={`wi ${props.weatherIcon} display-1`}></i> */}
          <img src={props.weatherIcon} alt="" />
        </h5>

        {props.temp_celsius ? (
          <h1 className="py-2">{props.temp_celsius}&deg;</h1>
        ) : null}
        {/**show min and max temp */}
        {minMaxTemp(props.temp_min, props.temp_max)}
        {/* <button onClick={corf("c")} className="btn btn-warning">
          C
        </button>
        <button onClick={corf("f")} className="btn btn-warning">
          F
        </button> */}

        <h4 className="py-3">{props.description}</h4>
      </div>
    </div>
  );
};

// key: 2ca910b2b61cc7f138572705bab1cb2f

function minMaxTemp(min, max) {
  if (min && max) {
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    );
  }
}

// function corf(value) {
//   if (value === "f") {
//       console.log("f")
//     return "temp_fahrenheit";
//   } else if (value === "c") {
//       console.log("c")
//     return "temp_celsius";
//   }
// }

export default Weather;
