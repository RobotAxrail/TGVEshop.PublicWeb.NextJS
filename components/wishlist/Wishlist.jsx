import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from 'next-translate/useTranslation';

import { useRouter } from "next/router";
// icons
import { CloseIcon } from "@/components/icons/Icons";

//Components
import CustomTable from "@/components/table/CustomTable";
import { Card } from "@/components/card/Card";
import { EmptyState } from "@/components/emptyState/EmptyState";
import { Loader } from "@/components/loader/Loader";
import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";
import { ContainedButton } from "@/components/buttons/Buttons";

// images
import empty from "@/images/empty-wishlist.svg";

const Wishlist = (props) => {
  const {
    isTimeOut,
    customerWishListIds = [],
    customerWishList = [],
    handleUpdateCustomerWishlist,
    isWishlistFetching,
  } = props;
  const { t } = useTranslation('common');
  const router = useRouter();
  return (
    <Fragment>
      {!isWishlistFetching && customerWishListIds.length === 0 ? (
        <div className="my-[100px]">
          <EmptyState
            src={empty}
            title={t("Your Wishlist is empty")+"!"}
            subtitle={t("Start adding as you shop by clicking the heart button")}
            hasButton={true}
            buttonTitle={t("continue_shopping")}
            buttonAction={() => router.push("/")}
            buttonClassName="mt-2"
          />
        </div>
      ) : (
        <div>
          <h1 className="text-center">{t("My Wishlist")}</h1>
          {isWishlistFetching ? (
            <Loader divHeight="h-[200px]" />
          ) : (
            <>
              <div className="hidden md:block">
                <div className="bg-white rounded shadow-paper overflow-x-auto">
                  <table className="max-w-1200 w-full table-fixed">
                    <thead className="bg-primary text-white text-left">
                      <tr>
                        <th className="p-[16px] rounded-tl-lg w-[20%]"></th>
                        <th className="p-[16px]">{t("Product")}</th>
                        <th className="p-[16px]">{t("Price")}</th>
                        <th className="p-[16px] w-[10%] rounded-tr-lg"></th>
                      </tr>
                    </thead>
                    <tbody className="text-[14px] font-semibold">
                      {customerWishList.map((data) => {
                        const imageDisplay =
                          process.env.BUCKET_URL + data.itemImage;
                        return (
                          <tr key={data.itemId}>
                            <td className="p-[16px]">
                              <div
                                className="w-[138px] h-[138px] bg-no-repeat bg-cover bg-center"
                                style={{
                                  backgroundImage: `url(${imageDisplay})`,
                                }}
                              />
                            </td>
                            <td className="p-[16px]">
                              <Link href={`/${data.itemSeoUrl}`} passHref>
                                <a className="no-underline">{data.itemTitle}</a>
                              </Link>
                            </td>
                            <td className="p-[16px]">
                              {data.deliveryCompareAtPrice <=
                              data.deliveryPrice ? (
                                <p className="m-0 p-0">
                                  <PriceWithCurrency
                                    value={data.deliveryPrice}
                                  />
                                </p>
                              ) : (
                                <>
                                  <p className="m-0 p-0 line-through text-[grey]">
                                    <PriceWithCurrency
                                      value={data.deliveryCompareAtPrice}
                                    />
                                  </p>
                                  <p className="m-0 p-0 text-[tomato] ">
                                    <PriceWithCurrency
                                      value={data.deliveryPrice}
                                    />
                                  </p>
                                </>
                              )}
                            </td>
                            <td className="p-[16px]">
                              <button
                                title={t("remove")}
                                className="
                               p-3
                               inline-flex 
                               justify-center items-center flex-auto
                               select-none 
                               rounded-full
                               outline-none
                               text-[grey]
                               hover:bg-black hover:bg-opacity-5"
                                onClick={
                                  () => {
                                    handleUpdateCustomerWishlist(
                                      data.itemId,
                                      data.itemProperty,
                                      data.customerWishListId
                                    );
                                  }

                                  // removeWishListItem(event, data)
                                }
                              >
                                <span className="flex justify-inherit items-inherit">
                                  <CloseIcon
                                    size="w-6 h-6"
                                    viewBox="0 0 24 24"
                                  />
                                </span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile WishList View */}
              <div className="md:hidden">
                {customerWishList.map((data, index) => {
                  const imageDisplay = process.env.BUCKET_URL + data.itemImage;

                  return (
                    <div className="mb-4" key={index}>
                      <Card
                        itemObj={data}
                        removeButtonAction={() => {
                          handleUpdateCustomerWishlist(
                            data.itemId,
                            data.itemProperty,
                            data.customerWishListId
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Wishlist;
