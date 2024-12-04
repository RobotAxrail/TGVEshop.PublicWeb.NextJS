import React, { useState } from "react";
// styles
import styles from "./StoreLocator.module.scss";

const Tag = ({ data, setSelectedTagData }) => {
  const [active, setActive] = useState(0);
  const handleActive = (index) => {
    setActive(index);
    setSelectedTagData(data[index])
  };
  return (
    <div className={styles["tag"]}>
      {data.map((item, i) => (
        <div
          onClick={() => handleActive(i)}
          key={i}
          className={[
            styles["tag-content"],
            styles[`${i === active ? "actived" : ""}`],
          ].join(" ")}
          // className={`tag-content ${i === active ? "actived" : ""}`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Tag;
