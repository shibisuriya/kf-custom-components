import React from "react";
import Dummy from "./FormField.jsx";

function Card(props) {
  return (
    <div>
      <h5>Card</h5>
      <div>
        <Dummy {...props} />
      </div>
    </div>
  );
}

export default Card;
