import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
// utils
import { createCookieForSignInData, isLocalHost } from "@/utils/util";
import Cookies from "universal-cookie";
import { v4 as uuidv4 } from "uuid";

//API
import {
  customerSignIn,
  customerSignOut,
  oTPVerification,
  resendOTP,
} from "@/graphql/mutations";
import { getCustomer } from "@/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
// contexts
import MerchantContext from "@/contexts/MerchantContext";
import { setToastState } from "@/states/toastBarState";
import { useMutation, useQuery } from "@tanstack/react-query";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const merchantInfoContext = useContext(MerchantContext);

  const router = useRouter();
  // const accessToken = router?.query?.accessToken || "";
  const cookie = new Cookies();
  // const signInData = cookie.get("signIn") || {};
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGetCustomer, setIsLoadingGetCustomer] = useState(false);
  const [OTPVerificationIsLoading, setOTPVerificationIsLoading] =
    useState(false);
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const accessToken =
    router?.query?.token || cookie.get("signIn")?.accessToken || "";

  const { isFetching } = useQuery({
    queryKey: ["getCustomerData", accessToken],
    queryFn: async () => {
      return await getCustomerData({
        accessToken: accessToken,
        ...(isLocalHost() && { merchantId: merchantInfoContext.merchantId }),
        autoSignIn: true,
      });
    },
    enabled: !!accessToken,
    onSuccess: (response) => {
      if (response.status) {
        setIsAuthenticated(true);
        createCookieForSignInData(
          {
            accountNo: response.user?.accountNo || "",
            refreshToken: response.user?.refreshToken || "",
            customerId: response.user?.customerId || "",
            accessToken: accessToken,
            merchantId: merchantInfoContext?.merchantId,
          },
          {
            primaryEmail: response.user?.primaryEmail || "",
            keepSignIn: false,
          }
        );
      } else {
        setIsAuthenticated(false);
        cookie.remove("signIn");
        cookie.set("sessionId", uuidv4(), { path: "/" });
        sessionStorage.clear("selectedItems");
      }
    },
    onError: (error) => {
      console.log(error);
      setIsAuthenticated(false);
    },
    refetchOnWindowFocus: false,
    refetchInterval: 180000,
  });

  // SignOut
  async function handleSignOut() {
    // setIsLoading(true);
    const signInData = cookie.get("signIn");
    try {
      let params = {
        accountNo: signInData.accountNo,
        accessToken: signInData.accessToken,
        refreshToken: signInData.refreshToken,
      };
      if (isLocalHost()) {
        params["merchantId"] = merchantInfoContext.merchantId;
      }
      let signout = await API.graphql(
        graphqlOperation(customerSignOut, params)
      );

      if (signout.data.customerSignOut.status === true) {
        cookie.remove("signIn");
        cookie.set("sessionId", uuidv4(), { path: "/" });
        sessionStorage.clear("selectedItems");
        setToastState({
          show: true,
          severity: "success",
          message: "Logout Successfully",
        });
        setIsAuthenticated(false);
        setUser({});
        router.push("/login");
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: "Logout Failed",
        });
      }
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  }

  // handle sign in
  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      let params = {
        primaryEmail: email,
        password: password,
        oldCustomerId: cookie.get("sessionId"),
      };
      if (isLocalHost()) {
        params["merchantId"] = merchantInfoContext.merchantId;
      }
      const user = await API.graphql(graphqlOperation(customerSignIn, params));
      if (user.data.customerSignIn.status === true) {
        const userSignInData = user.data.customerSignIn;
        createCookieForSignInData(userSignInData, {
          primaryEmail: email,
          merchantId: merchantInfoContext.merchantId,
        });
        getCustomerData({
          accessToken: userSignInData.accessToken,
          ...(isLocalHost() && { merchantId: merchantInfoContext.merchantId }),
          autoSignIn: true,
        });
        return true;
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setToastState({
          show: true,
          message: user.data.customerSignIn.message,
        });
        if (
          user.data.customerSignIn.message.includes(
            "Please Check Your Email To Verify Your Account."
          )
        ) {
          setOpenOtpModal(true);
        }
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  // otp verification
  const handleOtpVerification = async (otpValues, primaryEmail) => {
    setOTPVerificationIsLoading(true);
    let params = {
      customerOtp: otpValues,
      primaryEmail: primaryEmail,
    };
    if (isLocalHost()) {
      params["merchantId"] = merchantInfoContext.merchantId;
    }
    try {
      const res = await API.graphql(graphqlOperation(oTPVerification, params));
      if (res.data.oTPVerification.message === "Valid OTP and email") {
        setOpenOtpModal(false);
        setToastState({
          show: true,
          severity: "success",
          message: "Sign Up Successful",
        });
        if (router.query.return === "checkout") {
          console.log("to check again");
        }
        setOTPVerificationIsLoading(false);
        return true;
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: res.data.oTPVerification.message,
        });
        setOTPVerificationIsLoading(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setOTPVerificationIsLoading(false);
      setToastState({
        show: true,
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
      return false;
    }
  };

  // resend otp
  const handleOtpResend = async (e, primaryEmail) => {
    e.preventDefault();
    let params = {
      primaryEmail: primaryEmail,
    };
    if (isLocalHost()) {
      params["merchantId"] = merchantInfoContext.merchantId;
    }
    try {
      const res = await API.graphql(graphqlOperation(resendOTP, params));
      if (res.data.resendOTP.status === "true") {
        setToastState({
          show: true,
          severity: "success",
          message: res.data.resendOTP.message,
        });
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: res.data.resendOTP.message,
        });
      }
    } catch (error) {
      console.log(error);
      setToastState({
        show: true,
        severity: "error",
        message: "OTP Request Failed",
      });
    }
  };

  // get customer data
  const getCustomerData = async (params) => {
    try {
      let { data: responseObj } = await API.graphql(
        graphqlOperation(getCustomer, params)
      );
      if (
        responseObj.getCustomer.message === "Success" &&
        responseObj.getCustomer.status === true
      ) {
        setUser(responseObj.getCustomer);
        return { status: true, user: responseObj.getCustomer };
      } else {
        return { status: false, user: null };
      }
    } catch (error) {
      console.log(error);
      return { status: false, user: null };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        setIsAuthenticated,
        isAuthenticated,
        user,
        setUser,
        handleSignOut,
        handleLogin,
        handleOtpResend,
        handleOtpVerification,
        OTPVerificationIsLoading,
        isFetching,
        openOtpModal,
        setOpenOtpModal,
        getCustomerData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthContextProvider, useAuth };
