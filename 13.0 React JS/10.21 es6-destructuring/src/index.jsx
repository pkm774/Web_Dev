import React from "react";
import ReactDOM from "react-dom";
import cars from "./practice"

const [car1, car2] = cars;

ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
    </tr>
    <tr>
      <td>{car1.model}</td>
      <td>{car1.speedStats.topSpeed}</td>
      <td>{car1.coloursByPopularity[0]}</td>
    </tr>
    <tr>
      <td>{car2.model}</td>
      <td>{car2.speedStats.topSpeed}</td>
      <td>{car1.coloursByPopularity[0]}</td>
    </tr>
  </table>,
  document.getElementById("root")
);
