import React, { useContext, createContext } from "react";
import { IMerchant } from "types";

const MerchantContext = createContext<IMerchant>(null);

export default MerchantContext;
