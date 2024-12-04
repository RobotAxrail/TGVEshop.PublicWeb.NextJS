import React, { Fragment } from "react";
import { useRouter } from "next/router";
import useTranslation from 'next-translate/useTranslation';
// components
import { EmptyState } from "@/components/emptyState/EmptyState";
import AccountSidebarLayout from "@/components/layouts/AccountSidebarLayout";
// buttons
import { ContainedButton } from "@/components/buttons/Buttons";
// Icons
import empty from "@/images/empty-cart.svg";

const AddressBook = ({
  isTimeOut,
  isApiFetching,
  addressList,
  handleDeleteAddress = () => {},
  membershipTierActivated,
}) => {
  const router = useRouter();
  const handleRedirect = (type, idx = null) => {
    if (type !== "Edit") {
      return router.push("/edit-address-book");
    }
    return router.push({
      pathname: "/edit-address-book",
      query: { id: idx },
    });
  };
  const { t } = useTranslation('common');

  return (
    <AccountSidebarLayout isLoading={isApiFetching}>
      <div className="mt-4">
        {addressList.length > 0 ? (
          <>
            <div className="mb-10 w-full justify-end ">
              <ContainedButton
                className=""
                border="rounded"
                onClick={() => handleRedirect("add")}
              >
                {t("Add a new delivery address")}
              </ContainedButton>
            </div>
            {addressList.map((item, idx) => {
              return (
                <div className="w-full text-sm" key={idx}>
                  <div className=" p-[18px] mb-10 bg-white drop-shadow-md border rounded-lg">
                    <div className="flex justify-between">
                      <span className="sm:ml-5 font-bold">
                        {!!item.name ? item.name : t("Address") + (idx + 1)}
                      </span>
                      <div className="flex">
                        <button
                          className="text-primary mr-3 hover:underline"
                          onClick={() =>
                            handleRedirect(
                              "edit",
                              item.customerFavouriteAddressId
                            )
                          }
                        >
                          {t("Edit")}
                        </button>
                        <button
                          className="text-primary hover:underline"
                          onClick={() =>
                            handleDeleteAddress(item.customerFavouriteAddressId)
                          }
                        >
                          {t("Delete")}
                        </button>
                      </div>
                    </div>
                    <div className="sm:ml-5">{item.address}</div>
                    <div className="sm:ml-5">
                      {item.postalCode + " " + item.city}
                    </div>
                    <div className="sm:ml-5">{item.state}</div>
                    <div className="sm:ml-5">{item.country}</div>
                    {item.isDefaultShipping && item.isDefaultBilling ? (
                      <div className="pt-5">
                        {t("This is default shipping address and billing address")}
                      </div>
                    ) : item.isDefaultBilling && !item.isDefaultShipping ? (
                      <div className="pt-5">
                        {t("This is default billing address")}
                      </div>
                    ) : !item.isDefaultBilling && item.isDefaultShipping ? (
                      <div className="pt-5">
                        {t("This is default shipping address")}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="empty-address flex flex-col justify-center items-center">
            <EmptyState
              src={empty}
              title={t("Where's your place located?")}
              subtitle={t("Your delivery address will only used for delivery purpose")}
              hasButton={true}
              buttonTitle={t("Add New Delivery Address")}
              buttonAction={() => router.push("/edit-address-book")}
              buttonClassName="mt-2"
            />
          </div>
        )}
      </div>
    </AccountSidebarLayout>
  );
};

export default AddressBook;
