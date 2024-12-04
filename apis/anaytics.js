import Bowser from "bowser";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Cookies from "universal-cookie";

/**
 *
 * @param {string} queryString query string excluding the question mark
 * @param {string} variable the variable wanted out from query string
 * @returns value of requested variable if exists, else return null
 */

const pageObj = {
  "/": "landing",
  "/products": "collection",
  "/product": "product",
  "/checkout": "checkout",
  "/payment": "payment",
};

const sendAnalyticsData = (data) => {
  return axios({
    method: "put",
    url: "https://vwgd2b3gcc.execute-api.ap-southeast-1.amazonaws.com/prod/record",
    headers: { "Content-Type": "application/json" },
    data: data,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

/**
 *
 * @param {string} page
 * @param {string} pageId
 * @returns {object} adword payload
 */
export const generateAdwordPayload = async (page, pageId, merchantId) => {
  const cookie = new Cookies();
  const result = Bowser.parse(window.navigator.userAgent);
  const userAgent = {
    browser: result.browser.name,
    engine: result.engine.name,
    platform: result.platform.type,
    os: result.os.name + result.os.version,
  };
  const obj = {
    eventId: uuidv4(),
    visitId: localStorage.getItem("visitId"),
    customerId: cookie.get("platformAccountId") ?? cookie.get("sessionId"),
    page: pageObj[page],
    id: pageId,
    fbPixelId: "from fb, dont know the key of query string yet",
    googleAnalyticsId: "from ga dont know the query string from ga yet",
    userAgent: userAgent,
    ipAddress: sessionStorage.getItem("ip"),
    merchantId: merchantId,
    timestamp: new Date().toISOString(),
  };
  const payload = {
    Data: obj,
  };
  sendAnalyticsData(payload);
  return obj;
};
