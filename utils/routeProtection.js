/* eslint-disable react/display-name */
import { useContext, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { Loader } from "@/components/loader/Loader";
import MerchantContext from "@/contexts/MerchantContext";
import { StoreTypes } from "@/enums/enums";

// routeProtection.js
// withPublic checks if the user is logged in, if they are... it will reroute to '/'.
// (ex:) a logged in user tries to access /login; they will be rerouted to /.
export const withPublic = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { storeType } = useContext(MerchantContext);
    const { isAuthenticated, isFetching, isLoading } = useAuth();

    useEffect(() => {
      if (isAuthenticated) {
        if (router.query.source === "email") {
          router.replace("/view-cart");
        } else {
          if (storeType === StoreTypes.WHATSAPP_CRM_STORETYPE) {
            router.replace("/giftcard");
          } else router.replace("/");
        }
        return null;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    if (isFetching || isLoading || isAuthenticated) {
      return <Loader />; // full-screen loader here
    }
    return <WrappedComponent {...props} />;
  };
};

// withProtected checks if the user is not logged in, if not it will reroute to '/login'.
// (ex:) a logged out user tries to access /account, they will be rerouted to /login.
export const withProtected = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { isAuthenticated, isFetching, isLoading } = useAuth();
    useEffect(() => {
      if (router.pathname === "/login") return;
      if (router.pathname === "/giftcard" && !isAuthenticated && !isFetching) {
        router.replace("/404");
        return null;
      }

      if (!isAuthenticated && !isFetching) {
        router.replace("/login");
        return null;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isFetching]);

    if (!isAuthenticated || isLoading || isFetching) {
      return <Loader />; // full-screen loader here
    }

    return <WrappedComponent {...props} />;
  };
};
