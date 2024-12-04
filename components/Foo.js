import React from "react";

const Foo = (props) => (
  <div className="foo">
    <hr />
    Hi I&apos;m a Foo component with the headline:
    <h2>{props.block.headline}</h2>
  </div>
);

export default Foo;
