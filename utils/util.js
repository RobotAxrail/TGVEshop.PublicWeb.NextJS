import { OrderTypes, StoreTypes } from "@/enums/enums";
import axios from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import moment from "moment";
import Cookies from "universal-cookie";

dayjs.extend(isBetween);

export const compare = (item1, item2) => {
  if (item1.sequence < item2.sequence) return -1;
  // put A in front
  else if (item1.sequence > item2.sequence) return 1;
  // put B in front
  else return 0;
};

export const isEmpty = (obj) => {
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  if (obj == null) return true;
  if (obj === undefined) return true;
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;
  if (typeof obj !== "object") return true;
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }
  return true;
};

export const isValidPhoneNumber = (num, country) => {
  if (country === "my") {
    return /^(\+?6?01)[0|1|2|3|4|6|7|8|9]-*[0-9]{7,8}$/.test(num);
  } else if (country === "sg") {
    return /^(\+?65?[8|9])[0|1|2|3|4|6|7|8|9]\d{6}$/.test(num);
  } else if (country === "id") {
    return /^(\+?62|62|0)8[1-9][0-9]{6,10}$/.test(num);
  } else {
    return false;
  }
};

export const checkCurrCountry = (num) => {
  if (num.startsWith("+62")) {
    return "id";
  } else if (num.startsWith("+65")) {
    return "sg";
  } else if (num.startsWith("+60")) {
    return "my";
  } else {
    return null;
  }
};

export const isValidEmail = (str) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    str
  );
};

export const isDateBetween = (startDate, endDate) => {
  let isDateBetweenBool = false;
  const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
  };

  if (isValidDate(startDate) && isValidDate(endDate)) {
    const start = !!startDate ? moment(startDate) : undefined;
    const end = !!endDate ? moment(endDate) : undefined;
    isDateBetweenBool = moment().isBetween(start, end, null, "[]");
  }
  return isDateBetweenBool;
};

// Reusable Function to Enforce MaxLength
export const enforce_maxlength = (event) => {
  var t = event.target;
  if (t.hasAttribute("maxlength")) {
    t.value = t.value.slice(0, t.getAttribute("maxlength"));
  }
};

export const createCookieForSignInData = (userSignInData, signInData) => {
  const cookie = new Cookies();
  var expDate = 0;
  const data = {
    primaryEmail: signInData.primaryEmail,
    accountNo: userSignInData.accountNo,
    customerId: userSignInData.customerId,
    accessToken: userSignInData.accessToken,
    refreshToken: userSignInData.refreshToken,
    keepSignIn: signInData.keepSignIn ?? false,
  };
  if (signInData.keepSignIn) {
    expDate = new Date();
    expDate.setMonth(expDate.getMonth() + 5);
  }

  cookie.set("signIn", JSON.stringify(data), {
    expires: expDate,
    path: "/",
  });
  cookie.set("sessionId", data.customerId, {
    expires: expDate,
    path: "/",
  });
};

export const uploadFileToS3 = (signedUrl, file, loadingState) => {
  let form = new FormData();
  const newData = JSON.parse(signedUrl);
  Object.keys(newData.fields).forEach((key) =>
    form.append(key, newData.fields[key])
  );
  form.append("file", file);
  // return fetch(newData.url, { method: "POST", body: form });
  return axios.request({
    method: "POST",
    data: form,
    url: newData.url,
    onUploadProgress: (p) => {
      loadingState({
        fileprogress: p.loaded / p.total,
      });
    },
  });
};

export const totalPagination = (total, limit) => {
  return (total / limit) % 1 !== 0
    ? parseInt(total / limit) + 1
    : total / limit;
};

export const convertFrom24To12Format = (time24) => {
  const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
  const period = +sHours < 12 ? "AM" : "PM";
  const hours = +sHours % 12 || 12;

  return `${hours}:${minutes} ${period}`;
};

export const convertFrom12To24Format = (time12) => {
  const [sHours, minutes, period] = time12
    .match(/([0-9]{1,2}):([0-9]{2}) (AM|PM)/)
    .slice(1);
  const PM = period === "PM";
  const hours = (+sHours % 12) + (PM ? 12 : 0);

  return `${("0" + hours).slice(-2)}:${minutes}`;
};

export const getSelectedModifiersToDisplayList = (selectedModifierGroups) => {
  let outputList = [];

  selectedModifierGroups?.forEach((modifierGroup) => {
    if (
      modifierGroup.modifierGroupType === "text" &&
      modifierGroup.requestRemark
    ) {
      outputList.push(modifierGroup.requestRemark);
    } else {
      modifierGroup.modifier.forEach((modifier) => {
        if (modifier?.isSelected === undefined || modifier.isSelected) {
          outputList.push(modifier.modifierName);
        }
      });
    }
  });

  return outputList;
};

export const getDomainForSSR = (context) => {
    // let domain = "sepangpoc-red.demeter.ewarung.app";
    // let domain = "b2b.fam-dev.click";
    let domain = "tgveshop.fam-dev.click";
    // let domain = "jstore.fam-dev.click";
    // let domain = "tmstore.demeter.ewarung.app";
    // let domain = "elle.demeter.ewarung.app";
    // let domain = "uptimesuperstore.fam-dev.click" // for testing whatsapp crm store  

  if (
    !["localhost", ".vfs.cloud9.ap-southeast-1.amazonaws.com"].some((element) =>
      context.req.headers.host.includes(element)
    )
  ) {
    domain = context.req.headers["x-forwarded-host"];
  }

  return { domain };
};

export const isLocalHost = () => {
  return (
    window.location.href.includes("localhost") ||
    window.location.href.includes(".vfs.cloud9.ap-southeast-1.amazonaws.com")
  );
};

export const isQLEggs = (domain) => {
  return domain === "jstore.fam-dev.click";
};

/**
 * @param  {} orderType
 */
export const getOrderTypeText = (orderType) => {
  let text = "";

  switch (orderType) {
    case OrderTypes.PICKUP:
      text = "Pick Up";
      break;
    case OrderTypes.DINEIN:
      text = "Dine In";
      break;
    case OrderTypes.DELIVERY:
      text = "Delivery";
      break;
  }

  return text;
};

/**
 * Check for store availability
 * @param  {String} storeType warung, single online , multi offline
 * @param  {List} operatingHours list of operating Hours object
 * @param  {String} storeStatus open, close
 * @return {Boolean} true : available, false : not available
 */
export const checkStoreAvailability = (
  storeType,
  operatingHours,
  storeStatus
) => {
  if (storeType !== StoreTypes.WARUNG_STORETYPE) {
    return true;
  }

  /*
   *commented for AC-1179. to be observed
   */

  // const today = dayjs().day();
  // // Returns numbers from 1 (Monday) to 7 (Sunday).
  // const todayDate = dayjs().format("YYYY/MM/DD");
  // const storeOpeningDateTime = `${todayDate} ${operatingHours[today].open}`;
  // const storeClosingDateTime = `${todayDate} ${operatingHours[today].close}`;
  // const checkCurrentTimeIsBetweenOperatingHour = dayjs().isBetween(
  //   dayjs(storeOpeningDateTime, "YYYY/MM/DD HH:MM"),
  //   dayjs(storeClosingDateTime, "YYYY/MM/DD HH:MM"),
  //   "minute",
  //   "[)"
  // ); // true if same or after opening hour and before closing hour

  if (
    storeStatus === "open"
    /*
     *commented for AC-1179. to be observed
     */
    // &&
    // ((storeOpeningDateTime !== `${todayDate} Closed Full Day` &&
    //   checkCurrentTimeIsBetweenOperatingHour) ||
    //   storeOpeningDateTime === `${todayDate} Open Full Day`)
  ) {
    return true;
  } else return false;
};

//hardcoded order statuses
//poor backend design and short timelines led to the creation of this function
export const ToBeRemovedGetOrderStatusMapping = (order) => {
  if (order.manualPaymentReceipt && order.status === "Pending Payment")
    return "Pending Confirmation";
  else if (order.type === "PickUp" && order.status === "Shipping")
    return "Ready to pick up";
  else if (
    order.type === "Delivery" &&
    (order.status === "Shipping" || order.status === "Order Fulfilled")
  )
    return order.deliveryStatus || order.status;
  else return order.status;
};

export const handleMemberPrice = (
  isAuthenticated,
  normalPrice,
  memberDiscount
) => {
  if (isAuthenticated) {
    if (memberDiscount?.type === "amount") {
      return normalPrice - memberDiscount?.value <= 0
        ? 0
        : normalPrice - memberDiscount?.value;
    } else if (memberDiscount?.type === "percentage") {
      const discPercentage = memberDiscount?.value;
      return ((100 - discPercentage) / 100) * normalPrice;
    } else {
      return normalPrice;
    }
  } else {
    return normalPrice;
  }
};
