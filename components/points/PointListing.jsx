import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useTranslation from 'next-translate/useTranslation';
// components
import AccountSidebarLayout from "@/components/layouts/AccountSidebarLayout";
import { ContainedButton } from "@/components/buttons/Buttons";
import { EmptyState } from "@/components/emptyState/EmptyState";
// icons/imgs
import { LoadingIcon } from "@/components/icons/Icons";
import empty from "@/images/empty-cart.svg";
// utils
import { FormattedNumber } from "react-intl";
import moment from "moment";
// contexts
import MerchantContext from "@/contexts/MerchantContext";

const PointListing = (props) => {
  const { t } = useTranslation('common');
  const {
    totalPointLogsLength,
    isApiFetching,
    pointLogsList,
    isTimeOut,
    membershipTierActivated,
  } = props;
  const merchantInfoContext = useContext(MerchantContext);
  const router = useRouter();

  return (
    <AccountSidebarLayout isLoading={isApiFetching}>
      <>
        {totalPointLogsLength === 0 && !isApiFetching ? (
          <div className="flex items-center justify-center flex-col">
            <EmptyState
              src={empty}
              title={t("No orders yet.")}
              subtitle={t("You dont have any orders")}
              hasButton={true}
              buttonTitle={t("Browse products")}
              buttonAction={() => router.push("/")}
            />
          </div>
        ) : (
          <>
            {/* Normal order table */}
            <table className="hidden md:table md:table-auto w-full md:rounded-lg  ">
              <thead className="bg-primary text-left border-none">
                <tr>
                  <th className="p-[16px] text-[15px] rounded-tl-lg">{t("Points")}</th>
                  <th className="p-[16px] text-[15px]">{t("Date")}</th>
                  <th className="p-[16px] text-[15px]">{t("Action")}</th>
                  <th className="p-[16px] text-[15px] rounded-tr-lg" />
                </tr>
              </thead>
              <tbody className="text-[14px]">
                {pointLogsList?.map((data, idx) => {
                  return (
                    <tr key={idx}>
                      <td className="p-[16px]">
                        {data.type === "credit" && "+"}
                        {data.points}
                      </td>
                      <td className="p-[16px]">
                        <p className="">
                          {moment(data.createdAt).format("DD MMM YYYY")}
                          <br />
                          {moment(data.createdAt).format("hh:mm A")}
                        </p>
                      </td>
                      <td className="p-[16px]">
                        {data.type === "credit"
                          ? t("Purchased Product")
                          : t("Redeemed Voucher")}
                      </td>
                      <td className="p-[16px] text-center">
                        <Link href={`/order/${data.orderId}`} passHref>
                          <ContainedButton
                            outlined={true}
                            className="uppercase border-primary"
                            fontSize="text-[14px]"
                          >
                            {t("View Order")}
                          </ContainedButton>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* Mobile orders View */}
            <div className="md:hidden">
              {pointLogsList?.map((data, idx) => {
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-lg drop-shadow-md mb-2"
                  >
                    <Link href={`/order/${data.orderId}`} passHref>
                      <div className="p-6">
                        <div className="flex justify-between">
                          <div className="font-semibold mr-3">
                            {data.type === "credit"
                              ? t("Purchased Product")
                              : t("Redeemed Voucher")}
                          </div>
                        </div>
                        <div className="flex justify-between my-2">
                          <div className="flex flex-col xs:flex-row xs:items-center text-sm">
                            <div className="xs:mr-3">
                              {moment(data.createdAt).format("DD MMM YYYY")}
                            </div>
                            <div className="">
                              {moment(data.createdAt).format("hh:mm A")}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="mr-2 flex items-center">{t("total_label")}: </div>
                          <div className="text-primary text-xl">
                            {data.type === "credit" ? "+" : "-"}
                            {data.points} {data.points > 1 ? t("points"): t("point")}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </>
    </AccountSidebarLayout>
  );
};

export default PointListing;
