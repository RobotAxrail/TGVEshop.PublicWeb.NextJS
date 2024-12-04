import { useState, useEffect } from "react";

// style
import classes from "./Newsletter.module.scss";

// components
import { ContainedButton } from "@/components/buttons/Buttons";

// API
import { API, graphqlOperation } from "aws-amplify";
import { getNewsLetter } from "@/graphql/queries";

const Newsletter = () => {
  const [contactEmail, setContactEmail] = useState("");
  const [newsLetter, setNewsLetter] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //Get NewsLetter
  const getNewsLetterDetail = async () => {
    setIsLoading(true);
    try {
      var params = null;
      params = {
        merchantId: "5fd6ac1f-1cf8-4c96-81db-35e1d3b57d99",
      };
      let res = await API.graphql(graphqlOperation(getNewsLetter, params));
      let data = res.data.getNewsLetter;
      setNewsLetter(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getNewsLetterDetail();
    return () => {
      setNewsLetter()
    }
  }, []);

  return (
    <div className={classes.container}>
      {!isLoading ? (
        <div className={[classes['newsletter-paper'],"rounded" 
        ].join(' ')}>
          {newsLetter && (
            <div className={classes["newsletter-paper-layer"]}>
              <div className={classes.left}>
                <h5 className="m-0 text-xl text-white text-center font-normal 960-up:text-2xl">
                  {newsLetter.description}
                </h5>
              </div>
              <div className="right">
                <form autoComplete="off">
                  <div className="text-center m-2">
                    <input
                      id="standard-adornment-weight"
                      value={contactEmail || ""}
                      onChange={(e) => setContactEmail(e.target.value)}
                      aria-describedby="standard-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                      className="max-w[350px] py-2.5 h-11 mt-[0.35rem] px-[15px] bg-white outline-none rounded-full"
                      placeholder="Enter your email"
                    />
                    <ContainedButton
                      className="uppercase font-semibold ml-2.5 mt-2.5 h-11"
                      onClick={() => console.log("Subscribe")}
                    >
                      {newsLetter.buttonLabel}
                    </ContainedButton>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Newsletter;