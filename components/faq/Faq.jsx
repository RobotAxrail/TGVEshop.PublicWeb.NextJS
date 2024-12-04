import { useState, useEffect } from "react";

// components
import { ContainedButton } from "@/components/buttons/Buttons";
import Accordion from "./Accordion";

const Faq = (props) => {
  const { faqList } = props;
  const [selectedList, setSelectedList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // set the default category
  useEffect(() => {
    if (faqList.categories.length > 0) {
      setSelectedCategory(faqList.categories[0].title);
    } else {
      setSelectedCategory("");
    }
  }, [props]);

  // show the respective category content
  useEffect(() => {
    if (faqList !== "") {
      var items = [];
      faqList.items.map((item) => {
        if (item.category.toUpperCase() === selectedCategory.toUpperCase()) {
          items.push(item.faqContent);
        }
      });
      setSelectedList(items);
    }
  }, [selectedCategory]);

  const handleSelectCategory = (evt) => {
    setSelectedCategory(evt.target.textContent);
  };

  return (
    <div>
      <h1 className="text-center mb-5 pb-5 font-semibold text-3xl">FAQ</h1>
      <div className="flex flex-wrap w-full mb-[60px]">
        {faqList !== "" &&
          faqList.categories.map((obj, index) => {
            return (
              <div className="960-up:w-1/3 w-full flex-grow-0 p-1" key={index}>
                <ContainedButton
                  className={[
                    "h-[50px] border-primary border-2 w-full m-auto hover:bg-white hover:text-primary",
                    selectedCategory === obj.title
                      ? "!bg-white !text-primary"
                      : "",
                  ].join(" ")}
                  onClick={handleSelectCategory}
                  fontSize="text-base"
                >
                  {obj.title}
                </ContainedButton>
              </div>
            );
          })}
      </div>
      <hr className="h-1px bg-grey-divider" />
      <div className="flex flex-wrap w-full">
        {selectedCategory !== "" && (
          <div className="my-[60px] mx-auto p-1 w-full">
            <h2 className="text-center font-semibold">{selectedCategory}</h2>
            {selectedList.map((item) => {
              return item.map((faq, index) => {
                return <Accordion item={faq} key={index} />;
              });
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Faq;
