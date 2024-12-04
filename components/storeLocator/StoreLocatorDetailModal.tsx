import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faDiamondTurnRight,
  faPhone,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
// styles
import styles from "./StoreLocatorDetail.module.scss";

const StoreLocatorDetailModal = ({ close, data }) => {
  return (
    <div className="px-1 pb-6">
      <div className={styles["detail-header"]}>
        <h3>Details Store</h3>
        <FontAwesomeIcon icon={faClose} className={styles["icon"]} onClick={close} />
      </div>
      <div className={styles["title"]}>
        <div>{data?.name}</div>
      </div>
      <div className={styles["tag-container"]}>
        <h4 className="mb-2">Tags</h4>
        <div className={styles["detail-tag-list"]}>
          {data?.taggings?.map((item, i) => (
            <div key={i} className={styles["detail-tag"]}>
              {item}
            </div>
          ))}
        </div>
      </div>
     
      {/* <hr /> */}
      <div>
        <h4 className="mb-2">Address Details</h4>
        <div className={styles["content"]}>
          <div className={styles["icon-container"]}>
            <FontAwesomeIcon
              icon={faDiamondTurnRight}
              className={styles["icon icon-left"]}
              style={{ fontSize: "25px" }}
            />
          </div>
          <div className={styles["content-detail"]}>{data?.address}</div> 
        </div>
        <div className="pt-5 border-solid border-b-2 border-gray-300"></div>
      </div>
      <div>
        <h4 className="mb-2">Contact Number</h4>
        <div className={styles["content"]}>
          <div className={styles["icon-container"]}>
            <FontAwesomeIcon icon={faPhone} className={styles["icon icon-left"]} />
          </div>
          <div className={styles["content-detail"]}>{data?.managerContact}</div>
        </div>
        <div className="pt-5 border-solid border-b-2 border-gray-300"></div>
      </div>
      <div>
        <h4 className="mb-2">Hours</h4>
        <div className={styles["hours"]}>
          <div className={styles["hours-day"]}>
            {data?.storeOperatingHourList?.map((item, i) => (
              <div key={i} className={styles["day"]}>
                {item.day}
              </div>
            ))}
          </div>
          <div className={styles["hours-time"]}>
            {data?.storeOperatingHourList?.map((item, i) => (
              <div key={i} className={styles["hour"]}>
                {`${item.open} to ${item.close}`}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className={styles["share"]}>
        <FontAwesomeIcon icon={faArrowUpFromBracket} className={styles["icon"]} />
        <div>Share store details</div>
      </div> */}
    </div>
  );
};

export default StoreLocatorDetailModal;
