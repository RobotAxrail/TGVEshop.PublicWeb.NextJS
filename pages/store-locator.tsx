import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

//component
import SEO from "@/components/seo/SEO";
import Footer from '@/components/storeLocator/Footer';
import StoreLocatorPage from "@/components/storeLocator/StoreLocatorPage";
import StoreLocatorDetailModal from "@/components/storeLocator/StoreLocatorDetailModal";

//icons
import {
    faHome,
    faIdCard,
    faBucket,
    faBagShopping,
    faStore,
} from "@fortawesome/free-solid-svg-icons";

// context
import MerchantContext from "@/contexts/MerchantContext";

//hooks
import { useDebounce } from "@/hooks/useDebounce";

// API
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import {
  getNearbyStores,
} from "@/graphql/queries";


const StoreLocatorScreen = () => {

    const merchantInfoContext = useContext(MerchantContext);
    const [detail, setDetail] = useState(null);
    const [coord, setCoord] = useState({ lat: 3.126100, lng: 101.686546 });
    const [isLoading, setIsLoading] = useState(false)
    const [storeList, setStoreList] = useState([])
    const [selectedTagData, setSelectedTagData] = useState("")
    const [searchKeyword, setSearchKeyword] = useState("")
    const debouncedSearchTerm = useDebounce(searchKeyword, 500);
    
    const data = [
        "Open Now",
        "Free Wifi",
        "Nitro Cold Brew",
        "Station",
        "Restaurant",
    ];

    const menu = [
        { icon: faHome, label: "Home" },
        { icon: faIdCard, label: "Cards" },
        { icon: faBucket, label: "Order" },
        { icon: faBagShopping, label: "Shop" },
        { icon: faStore, label: "Store" },
    ];

    const handleClose = () => setDetail(null);
    const handleDetail = (data) => setDetail(data);

    const daySorter = {
      "sunday": 0, // << if sunday is first day of week
      "monday": 1,
      "tuesday": 2,
      "wednesday": 3,
      "thursday": 4,
      "friday": 5,
      "saturday": 6,
      // "sunday": 7
    }

    const fetchNearbyStoresList = async (keyword: string) => {
      setIsLoading(true)
      try {
        let params = {
          longitude: coord?.lng,
          latitude: coord?.lat,
          deliveryMode: "pickup",
          orderType: "pickup",
          keyword: keyword ? keyword : "ALL STORES",
          merchantId: merchantInfoContext.merchantId,
          // taggings: [selectedTagData ? selectedTagData : data[0]]
        }
        const nearbyStoresRes = (await API.graphql(graphqlOperation(getNearbyStores, params))) as GraphQLResult<any>;
        if (nearbyStoresRes.data.getNearbyStores && nearbyStoresRes.data.getNearbyStores.length > 0){
          let stores = nearbyStoresRes.data.getNearbyStores
          stores.map((store) => {
            let storeOperatingHours = store?.storeOperatingHourList
            storeOperatingHours.sort(function sortByDay(a, b) {
              let day1 = a.day.toLowerCase();
              let day2 = b.day.toLowerCase();
              return daySorter[day1] - daySorter[day2];
            });
            store['storeName'] = store.name
            store['storeOperatingHourList'] = storeOperatingHours
            return store
          })
          setStoreList(stores)
        } else {
          setStoreList([])
        }
        setIsLoading(false)
      } catch(error){
        console.log(error)
        setStoreList([])
        setIsLoading(false)
      }
    }

    useEffect(() => {
      fetchNearbyStoresList(null)
    }, [])

    // useEffect(() => {
    //   if (debouncedSearchTerm.length > 0){
    //     fetchNearbyStoresList(debouncedSearchTerm)
    //   }
    //   else if (selectedTagData){
    //     fetchNearbyStoresList(null)
    //   }
    // }, [debouncedSearchTerm, selectedTagData])

    return (
        <>
          <SEO
              title={"Store Locator"}
              keywords=""
              description="Store Locator"
          />
          <div className="flex flex-col h-full w-full sm:w-[25rem] mx-auto bg-locator-primary">
            <div className="px-2.5">
              {!detail ? (
                <StoreLocatorPage 
                  data={storeList ? storeList.filter((e) =>
                    e.storeName
                      .toLowerCase()
                      .includes(debouncedSearchTerm.toLowerCase())
                  ) : []} 
                  tagData={data}
                  setSelectedTagData={setSelectedTagData} 
                  searchKeyword={searchKeyword}
                  setSearchKeyword={setSearchKeyword} 
                  isLoading={isLoading} 
                  handleDetail={handleDetail} 
                />
                ) : (
                  <StoreLocatorDetailModal close={handleClose} data={detail} />
                )}
            </div>
          </div>
        </>
    )
}

export default StoreLocatorScreen;