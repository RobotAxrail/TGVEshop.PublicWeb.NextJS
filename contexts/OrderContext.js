import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
// utils
import Cookies from "universal-cookie";
// contexts
import { useAuth } from "@/contexts/AuthContext";
import MerchantContext from "@/contexts/MerchantContext";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useLoadScript } from "@react-google-maps/api";
import {
  googleMapAPILibraries,
  OrderModalStateActions,
  OrderTypes,
} from "@/enums/enums";
//constants
import { StoreTypes } from "@/enums/enums";

const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const { orderOption, storeType } = useContext(MerchantContext);
  const cookie = new Cookies();
  const { isAuthenticated } = useAuth();
  const [orderType, setOrderType] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const { isLoaded: googleMapsIsLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries: googleMapAPILibraries,
  });
  //store address store for guest, local storage to persist data between pages
  const [localStorageAddress, setLocalStorageAddress] = useLocalStorage(
    "deliveryAddress",
    {}
  );
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: "",
    selectedLatLng: { lat: null, lng: null },
    addressDetail: null,
    address: "",
    city: "",
    country: "",
    postalCode: "",
    state: "",
  });

  // const [orderModalState, setOrderModalState] = useState({
  //   view: false,
  //   validateOnOpen: false,
  //   section: null,
  // });

  const INITIAL_ORDER_MODAL_STATE = {
    view: false,
    validateOnOpen: false,
    section: null,
    addressDetailToEdit: null,
    closeAfterSubmitting: false,
  };

  const orderModalReducer = (state, action) => {
    switch (action.type) {
      case OrderModalStateActions.ADD_ADDRESS:
        return {
          ...INITIAL_ORDER_MODAL_STATE,
          view: true,
          section: "Add",
        };
      case OrderModalStateActions.EDIT_ADDRESS:
        return {
          ...INITIAL_ORDER_MODAL_STATE,
          view: true,
          section: isAuthenticated ? "Edit" : null,
          addressDetailToEdit: action.data.addressDetailToEdit,
          ...(action.data.closeAfterSubmitting && {
            closeAfterSubmitting: action.data.closeAfterSubmitting,
          }),
        };
      case OrderModalStateActions.CLOSE:
        return {
          ...INITIAL_ORDER_MODAL_STATE,
          view: false,
        };
      case OrderModalStateActions.HOME:
        return {
          ...INITIAL_ORDER_MODAL_STATE,
          view: true,
          section: null,
        };
      case OrderModalStateActions.OPEN_VALIDATE:
        return {
          ...INITIAL_ORDER_MODAL_STATE,
          view: true,
          validateOnOpen: true,
          section: null,
        };
      default:
        throw new Error("Invalid reducer action type for orderModalReducer");
    }
  };

  const [orderModalState, dispatchOrderModalState] = useReducer(
    orderModalReducer,
    INITIAL_ORDER_MODAL_STATE
  );

  const [deliveryAddressList, setDeliveryAddressList] = useState([]);

  const signInData = cookie.get("signIn");

  useEffect(() => {
    if (!isAuthenticated) localStorage.removeItem("deliveryAddress");
  }, [isAuthenticated]);

  let orderTypeInitialized = useRef(false);

  //using useEffect to initialized orderType cookie as previously ssr pages will render page incorrectly.
  
  // useEffect(() => {
  //   if (storeType === StoreTypes.WHATSAPP_CRM_STORETYPE) return;
  //   if (!orderTypeInitialized.current && orderOption.length > 0) {
  //     //temporararily hardcode as delivery for AC
  //     setOrderType(
  //       storeType !== StoreTypes.WARUNG_STORETYPE
  //         ? "Delivery"
  //         : cookie.get("orderType")
  //         ? cookie.get("orderType")
  //         : orderOption[0]
  //     );
  //     orderTypeInitialized.current = true;
  //   }
  // }, [cookie, orderOption]);

  const handleChangeOrderType = (orderTypeInput) => {
    setOrderType(orderTypeInput);
    cookie.set("orderType", orderTypeInput, { path: "/" });
  };

  return (
    <OrderContext.Provider
      value={{
        orderType,
        handleChangeOrderType,
        tableNumber,
        setTableNumber,
        deliveryAddress: signInData ? deliveryAddress : localStorageAddress,
        setDeliveryAddress: signInData
          ? setDeliveryAddress
          : setLocalStorageAddress,
        deliveryAddressList,
        setDeliveryAddressList,
        orderModalState,
        dispatchOrderModalState,
        googleMapsIsLoaded,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
const useOrder = () => {
  return useContext(OrderContext);
};
export { OrderContext, OrderContextProvider, useOrder };
