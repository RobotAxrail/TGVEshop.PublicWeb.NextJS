import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "@/components/loader/Loader";

export default function PrivateRoute({ protectedRoutes, children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathIsProtected) {
      // Redirect route, you can point this to /login
      router.push("/login");
    }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated, pathIsProtected]);

  if ((isLoading || !isAuthenticated) && pathIsProtected) {
    return <Loader />;
  }

  return children;
}
