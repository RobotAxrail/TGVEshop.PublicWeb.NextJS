import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { useRouter } from "next/router";

// apis
import { API, graphqlOperation } from "aws-amplify";
import { getCustomerWishList } from "@/graphql/queries";
import { updateCustomerWishlist } from "@/graphql/mutations";
//utils
import Cookies from "universal-cookie";
// contexts
import { useAuth } from "@/contexts/AuthContext";
import MerchantContext from "@/contexts/MerchantContext";

import { setToastState } from "@/states/toastBarState";
import { StoreTypes } from "@/enums/enums";

const WishlistContext = createContext({});
const cookie = new Cookies();

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.item];
    case "remove":
      return state.filter((id) => id !== action.item);
    case "init":
      return action.item;
    default:
      throw new Error();
  }
};

const WishlistContextProvider = ({ children }) => {
  const { merchantId, storeType } = useContext(MerchantContext);

  const router = useRouter();
  const [customerWishList, setCustomerWishList] = useState([]);
  const { isAuthenticated } = useAuth();
  const [isWishlistFetching, setIsWishlistFetching] = useState(false);
  const [customerWishListIds, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    if (storeType === StoreTypes.WHATSAPP_CRM_STORETYPE) return;
    if (isAuthenticated) {
      fetchCustomerWishList().then((response) => {
        dispatch({
          type: "init",
          item: response.map((obj) => obj.itemId),
        });
      });
    } else {
      dispatch({
        type: "init",
        item: [],
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (router.pathname === "/wishlist") fetchCustomerWishList();
  }, [router.pathname]);

  // fetch customer wishlist
  const fetchCustomerWishList = async () => {
    const signInData = cookie.get("signIn");
    setIsWishlistFetching(true);
    try {
      var params = {
        customerId: signInData.customerId,
        merchantId: merchantId,
        accessToken: signInData.accessToken,
      };

      let res = await API.graphql(
        graphqlOperation(getCustomerWishList, params)
      );
      if (res.data.getCustomerWishList.status === true) {
        let data = res.data.getCustomerWishList.products;
        setCustomerWishList(data);

        setIsWishlistFetching(false);
        return data;
      } else {
        setIsWishlistFetching(false);
        return [];
      }
    } catch (error) {
      setIsWishlistFetching(false);
      return [];
    }
  };

  // find back which one is favorited to update fav button color
  const getFavouriteStatus = (id) => {
    if (customerWishListIds.length !== 0) {
      return customerWishListIds.find((itemId) => itemId === id);
    } else return false;
  };

  const getCustomerWishListIdOfItem = (itemId) => {
    return (
      customerWishList.find((wishlistItem) => wishlistItem.itemId === itemId)
        ?.customerWishListId ?? null
    );
  };

  // update customer wishlist
  const handleUpdateCustomerWishlist = async (
    selectedItemId,
    selectedItemProperty,
    customerWishListId = null
  ) => {
    const signInData = cookie.get("signIn");
    try {
      const params = {
        customerId: signInData.customerId,
        itemId: selectedItemId,
        itemProperty: selectedItemProperty,
        customerWishListId: customerWishListId,
        salesChannelName: "Online Store",
      };
      let res = await API.graphql(
        graphqlOperation(updateCustomerWishlist, params)
      );
      if (res.data.updateCustomerWishlist.status === "true") {
        setToastState({
          show: true,
          severity: "success",
          message: res.data.updateCustomerWishlist.message,
        });
        //check if returned message contain the word "Removed"
        if (res.data.updateCustomerWishlist.message.indexOf("Removed") !== -1) {
          dispatch({
            type: "remove",
            item: selectedItemId,
          });
          setCustomerWishList(
            customerWishList.filter((obj) => obj.itemId !== selectedItemId)
          );
        } else {
          dispatch({
            type: "add",
            item: selectedItemId,
          });
        }
        return true;
      } else if (res.data.updateCustomerWishlist.status === "false") {
        setToastState({
          show: true,
          severity: "error",
          message: res.data.updateCustomerWishlist.message,
        });
        return false;
      }
    } catch (error) {
      console.log(error);
      setToastState({
        show: true,
        severity: "error",
        message: "Error occurred",
      });
      return false;
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        customerWishList,
        customerWishListIds,
        handleUpdateCustomerWishlist,
        getFavouriteStatus,
        getCustomerWishListIdOfItem,
        isWishlistFetching,
        fetchCustomerWishList,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
const useWishlist = () => {
  return useContext(WishlistContext);
};
export { WishlistContext, WishlistContextProvider, useWishlist };
