import React, { useEffect, useState } from "react";
// icons library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";

const StarRating = (props) => {
  const {
    formValues = {},
    setFormValues,
    type,
    givenRating = 0,
    totalStar = 5,
    starSize = "",
  } = props;

  const [rating, setRating] = useState(
    formValues.rating ? formValues.rating : 1
  );
  const [hover, setHover] = useState(0);

  const bodyComponent = () => {
    switch (type) {
      case "readonly":
        return (
          <>
            {[...Array(totalStar)].map((star, index) =>
              index < givenRating && index + 1 > givenRating ? (
                <FontAwesomeIcon
                  key={index}
                  icon={faStarHalfStroke}
                  className={["text-yellow-300", starSize].join(" ")}
                />
              ) : // check if current star should be full
              index < givenRating ? (
                <FontAwesomeIcon
                  key={index}
                  icon={faStarSolid}
                  className={["text-yellow-300", starSize].join(" ")}
                />
              ) : (
                // else, current star should be empty
                <FontAwesomeIcon
                  key={index}
                  icon={faStarRegular}
                  className={["text-yellow-300", starSize].join(" ")}
                />
              )
            )}
          </>
        );

      default:
        return (
          <>
            {[...Array(totalStar)].map((star, index) => {
              index += 1;
              return (
                <div
                  key={index}
                  onClick={() => {
                    setRating(index);
                    setFormValues({
                      ...formValues,
                      rating: index,
                    });
                  }}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <FontAwesomeIcon
                    icon={
                      index <= (hover || rating) ? faStarSolid : faStarRegular
                    }
                    className={"text-yellow-300 cursor-pointer"}
                  />
                </div>
              );
            })}
          </>
        );
    }
  };

  return <div className="flex">{bodyComponent()}</div>;
};

export default StarRating;
