import React from "react";

//components
import { LoadingIcon } from "@/components/icons/Icons";
import Tag from './Tag';
import Map from '../contactUs/Map'

// styles
import { SearchIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./StoreLocator.module.scss";

const StoreLocatorPage = ({ 
  data, 
  tagData,
  setSelectedTagData, 
  searchKeyword,
  setSearchKeyword, 
  isLoading, 
  handleDetail 
}) => {


  const center = {
    lat: Number("3.1181728"),
    lng: Number("101.6783391"),
  };

  return (
    <div className={styles["place-container"]}>
      {/* Header */}

      <div className={styles["header"]}>
        <h2>Find A Store</h2>
      </div>
      
      {/* Search*/}
      <div className="flex h-10 overflow-hidden relative">
        <input
          className={[
            "w-full rounded-lg border-solid border-2 border-gray-300 hover:outline-none focus:outline-none py-[5px] pl-[1rem] pr-[3rem] placeholder:text-[15px]",
            searchKeyword
              ? "font-normal"
              : "font-medium",
          ].join(" ")}
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
          placeholder="Search"
        />
        <SearchIcon className="w-5 h-5 text-gray-500 absolute right-5 top-[22%]" />
      </div>
      
      {/* Tags*/}
      {/* <div className="mt-5">
        <Tag data={tagData} setSelectedTagData={setSelectedTagData}  />
      </div> */}
      
      {/* Maps*/}
       <div
          className={
            "flex flex-col sm:h-[40vh] rounded-lg overflow-hidden flex-grow mt-4 mb-6"
          }
        >
          <div className="relative flex-grow">
            <div>
              {isLoading && (
                <div> Loading... </div>
              )}
              {data?.length > 0 && (
                <div className="my-4">
                  <Map
                    mapZoom={12}
                    mapCenter={center}
                    mapOptions={{
                      zoomControl: false,
                      streetViewControl: false,
                      mapTypeControl: false,
                      fullscreenControl: false,
                      gestureHandling: "greedy",
                    }} 
                    stores={data} 
                  />
                </div>
              )}
            </div>
          </div>
      </div>

      {/* Store Listing*/}
      <div className="pb-16">
        <div className={styles["place-container-header"]}>
          <div className={styles["container-title"]}>Nearby</div>
        </div>
        {isLoading && (
          <div className="h-[25rem] flex justify-center items-center">
            <LoadingIcon color="locator-secondary" width="w-7" height="h-7" />
          </div>
        )}
        {!isLoading && data.map((item, index) => (
          <div key={index} className={styles["place"]}>
            <div className={styles["name"]}>{item.name}</div>
            <div className={styles["operational"]}>({`Open until ${item.todayCloseTime}`})</div>
            <div className={styles["description"]}>{item.address}</div>
            <button
              type="button"
              className={styles["button"]}
              onClick={() => handleDetail(item)}
            >
              <span className="relative pointer-events-none">
                See Details
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreLocatorPage;
