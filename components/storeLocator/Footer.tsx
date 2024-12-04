import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// styles
import styles from "./StoreLocator.module.scss";

const Footer = ({ menu }) => {
  const [active, setActive] = useState(0);
  const handleActive = (index) => {
    setActive(index);
  };
  return (
    <div className={styles["footer-container"]}>
      {menu.map((item, index) => (
        <div
          key={index}
          onClick={() => handleActive(index)}
          className={[
            styles["menu"],
            styles[`${index === active ? "actived" : ""}`],
          ].join(" ")}
        >
          <FontAwesomeIcon
            icon={item.icon}
            className={[
              styles["icon"],
              styles[`${index === active ? "actived" : ""}`],
            ].join(" ")}
          />
          <div>{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Footer;
