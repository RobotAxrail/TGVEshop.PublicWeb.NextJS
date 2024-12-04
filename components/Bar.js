import React from "react";

const Bar = (props) => (
  <div className="bar">
    <hr />
    {`Hi I'm a Bar component with the title:`}
    <h2>{props.block.title}</h2>
  </div>
);

export default Bar;
