import { MultiStoreDeliveryContext } from "../context/MultiStoreDeliveryProvider";
import { useContext } from "react";

export default function useMultiStoreDelivery() {
  return useContext(MultiStoreDeliveryContext);
}
