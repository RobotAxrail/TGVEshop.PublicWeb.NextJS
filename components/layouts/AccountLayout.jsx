import React, { Fragment } from "react";
import { useRouter } from "next/router";

// components
import SideBarProfile from "@/components/sideBarProfile/SideBarProfile";
import { Loader } from "@/components/loader/Loader";
import { useAuth } from "@/contexts/AuthContext";

const AccountLayout = ({
  isTimeOut,
  isApiFetching,
  title,
  children,
  sideBarValue,
  rightSideContentWrapperClassname,
  membershipTierActivated,
}) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <Fragment>
      {!isTimeOut ? (
        <div className="mb-9">
          <div className="text-center">
            <h1 className="my-8 text-2xl sm:text-3xl">{title}</h1>
          </div>
          <div className="flex mx-2">
            {isAuthenticated ? (
              <div className="hidden lg:block lg:w-1/3">
                <SideBarProfile
                  value={sideBarValue}
                  membershipTierActivated={membershipTierActivated}
                />
              </div>
            ) : null}

            <div className="w-full">
              {/* bg-white rounded-lg drop-shadow-md */}
              <div className={rightSideContentWrapperClassname}>
                {isApiFetching ? (
                  <Loader divHeight="h-[300px]" />
                ) : (
                  <div className={sideBarValue === 1 ? "p-10" : "lg:p-10"}>
                    {children}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default AccountLayout;
