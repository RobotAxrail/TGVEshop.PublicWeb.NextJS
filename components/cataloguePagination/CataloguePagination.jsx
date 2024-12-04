import { useFirstRender } from "@/hooks/useFirstRender";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import classes from "./CataloguePagination.module.scss";

export const CataloguePagination = ({
  totalPages,
  selectedPage,
  handleSelectPage,
  handleBackButton,
  handleForwardButton,
  limit,
}) => {
  const [pagesToDisplayList, setPagesToDisplayList] = useState([]);
  const getPages = () => {
    let itemsToDisplay = [];

    pagesToDisplayList.map((currentPage, i) => {
      const pageNumStyling =
        currentPage === selectedPage
          ? ["bg-primary", classes.selected].join(" ")
          : classes.unselected;
      itemsToDisplay.push(
        <div key={currentPage}>
          <div
            onClick={() => handleSelectPage(currentPage)}
            className={`${pageNumStyling} rounded-md`}
          >
            {currentPage}
          </div>
          {((pagesToDisplayList[pagesToDisplayList.length - 1] > 5 &&
            currentPage === 2) ||
            (totalPages > 5 &&
              i === pagesToDisplayList.length - 1 &&
              pagesToDisplayList[pagesToDisplayList.length - 1] !==
                totalPages)) && <div className={classes.unselected}>...</div>}
        </div>
      );
    });

    return itemsToDisplay;
  };

  const isFirstRender = useFirstRender();

  //everytime a page is selected, change the pages list
  useEffect(() => {
    const handleChangeSelectedPage = () => {
      const initialPagesList = Array.from(
        { length: totalPages > 5 ? 5 : totalPages },
        (_, i) => i + 1
      );
      let newPagesList = pagesToDisplayList.length
        ? pagesToDisplayList
        : initialPagesList;

      //handle pagination for more than 5 page
      if (selectedPage >= 5) {
        for (let i = 0; i < 3; i++) {
          let pageNumToAdd = i - 1;
          if (selectedPage !== totalPages) {
            newPagesList[i + 2] = selectedPage + pageNumToAdd;
          } else {
            pageNumToAdd = i - 2;
            newPagesList[i + 2] = selectedPage + pageNumToAdd;
          }
        }
      }

      if (selectedPage < 5) {
        newPagesList = initialPagesList;
      }

      //prevent fetch on first render
      // fetchList((selectedPage - 1) * limit);

      setPagesToDisplayList(newPagesList);
    };

    if (totalPages > 0) {
      handleChangeSelectedPage();
    }
  }, [selectedPage, totalPages]);

  return (
    <div className={classes.container}>
      <div onClick={handleBackButton} className={classes.unselected}>
        <ChevronLeftIcon />
      </div>
      {getPages()}
      <div onClick={handleForwardButton} className={classes.unselected}>
        <ChevronRightIcon />
      </div>
    </div>
  );
};
