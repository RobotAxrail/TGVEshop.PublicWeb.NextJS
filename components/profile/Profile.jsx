import React, { useState, useEffect } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

// component
import AccountSidebarLayout from "@/components/layouts/AccountSidebarLayout";
import { ContainedButton } from "@/components/buttons/Buttons";
import {
  RectTextInput,
  RectDateInputWrapper,
  Checkbox,
  RectSelectInput,
  CustomPhoneInput,
} from "@/components/inputs/Input";
import { SingleDatePicker } from "react-dates";
import DialogModal from "@/components/dialog/DialogModal";

// icons
import back from "@/images/back-icon.svg";
import next from "@/images/next-icon.svg";

// styles
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import classes from "./Profile.module.scss";

// utils
import moment from "moment";
import { isValidPhoneNumber, isValidEmail, checkCurrCountry } from "@/utils/util";
import { FormattedNumber } from "react-intl";

const Profile = (props) => {
  const {
    customerData,
    setCustomerData,
    handleUpdateProfile,
    handleUpdatePassword,
    isApiFetching,
    isLoading,
    passwordData,
    setPasswordData,
    isChangePasswordLoading,
    membershipTierActivated,
    merchantName,
    showSideBar = true,
    showPassword = true,
    showCheckbox = true,
    pageName
  } = props;
  const [focus, setFocus] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [currCountry, setCurrCountry] = useState("my");
  const [isSavingBirthDateFirstTime, setSavingBirthDateFirstTime] =
    useState(false);
  // const [isChangePasswordLoading, setIsChangePasswordLoading] = useState(false);
  // Notify for error Message
  const [error, setError] = useState({
    show: false,
    item: "",
    message: "",
  });

  const [inputError, setInputError] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
  });

  const { t } = useTranslation("common");

  //Modify Member Data
  const onChange = (e, validationField) => {
    if (e.target.value === " ") {
      setCustomerData({ ...customerData, [e.target.name]: "" });
    } else {
      setCustomerData({ ...customerData, [e.target.name]: e.target.value });
    }

    if (validationField && e.target.value) {
      setInputError({
        ...inputError,
        [validationField]: "",
      });
    }
  };

  const gender = ["Male", "Female"];

  // return year options
  const returnYears = () => {
    let years = [];
    let i = moment().year() - 150;
    while (i <= moment().year()) {
      years.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
      i++;
    }
    return years;
  };

  // months & years selection
  const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => (
    <div className="flex justify-center text-14px month-year-inputs">
      <div className="px-3">
        <select
          value={month.year()}
          className="cursor-pointer"
          onChange={(e) => onYearSelect(month, e.target.value)}
        >
          {returnYears()}
        </select>
      </div>
      <div className="px-3">
        <select
          className="cursor-pointer"
          value={month.month()}
          onChange={(e) => onMonthSelect(month, e.target.value)}
        >
          {moment.months().map((label, value) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  function validateFields() {
    const firstName = customerData?.firstName;
    const lastName = customerData?.lastName;
    const dateOfBirth = customerData?.dateOfBirth;
    const gender = customerData?.gender;

    const validationMap = [
      {
        field: "firstName",
        message: "Please insert your first name",
        value: firstName,
      },
      {
        field: "lastName",
        message: "Please insert your last name",
        value: lastName,
      },
      {
        field: "dateOfBirth",
        message: "Please select your date of birth",
        value: dateOfBirth,
      },
      {
        field: "gender",
        message: "Please select your gender",
        value: gender,
      },
    ];

    const errors = validationMap.map((item) => {
      if (!item.value) {
        return [item.field, item.message];
      }
      return [item.field, ""];
    });

    const errorMap = Object.fromEntries(errors);

    if (Object.values(errorMap).every((x) => x === "")) {
      return true;
    }

    setInputError(errorMap);
    return false;
  }

  //Update Customer Info
  async function handleOnSave(type) {
    if (!validateFields()) {
      return;
    }

    if (
      customerData.mobileNo !== "" &&
      !isValidPhoneNumber(customerData.mobileNo, currCountry)
    ) {
      setError({
        show: true,
        item: "mobileNo",
        message: t("Invalid phone number"),
      });
    } else if (
      customerData.primaryEmail !== "" &&
      !isValidEmail(customerData.primaryEmail)
    ) {
      setError({
        show: true,
        item: "primaryEmail",
        message: t("Please insert the correct email"),
      });
    } else if (
      type === "password" &&
      (passwordData.retypeNewPassword === "" ||
        passwordData.retypeNewPassword !== passwordData.newPassword)
    ) {
      setError({
        show: true,
        item: "retypeNewPassword",
        message: t("Password does not match"),
      });
    } else {
      // setChangePassword(false);
      setSavingBirthDateFirstTime(false);
      handleUpdateProfile();
    }
  }

  const handleChangeBirthdayDate = (value) => {
    setSavingBirthDateFirstTime(true);
    setCustomerData({
      ...customerData,
      dateOfBirth: moment(value).format("YYYY-MM-DD"),
    });
    setInputError({
      ...inputError,
      dateOfBirth: "",
    });
  };

  //Change Password
  const handleChangePassword = () => {
    setOpenChangePasswordModal(true);
  };

  const onChangePassword = (e) => {
    if (e.target.value === " ") {
      setPasswordData({ ...passwordData, [e.target.name]: "" });
    } else {
      setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    }

    if (e.target.name === "retypeNewPassword") {
      if (e.target.value !== passwordData.newPassword) {
        setError({
          show: true,
          item: "retypeNewPassword",
          message: t("Password does not match"),
        });
      } else {
        setError({
          ...error,
          show: false,
        });
      }
    }
  };

  // clear password data after dialog closed
  useEffect(() => {
    if (!openChangePasswordModal) {
      setPasswordData({
        password: "",
        newPassword: "",
        retypeNewPassword: "",
      });
      setError({
        show: false,
        item: "",
        message: "",
      });
    }
  }, [openChangePasswordModal, setPasswordData]);

  useEffect(() => {
    if (customerData && customerData.mobileNo){
      setCurrCountry(checkCurrCountry(customerData.mobileNo))
    }
  }, [customerData])

  return (
    <AccountSidebarLayout isLoading={isApiFetching} showSideBar={showSideBar} pageName={pageName}>
      <React.Fragment>
        {membershipTierActivated && (
          <div className="flex flex-col">
            <h3>{t("Membership")}</h3>
            <div>
              {customerData.membershipTier && (
                <div>
                  {t("Tier")} :{" "}
                  <label className="font-semibold">
                    {customerData.membershipTier}
                  </label>
                </div>
              )}
              <div>
                {`${t("Total earned points")}: `}
                <label className="text-[20px] font-medium">
                  <FormattedNumber
                    value={customerData?.totalEarnedMembershipPoint || 0}
                  />
                </label>{" "}
                {t("points")}
              </div>
              <div>
                {t("You have")}{" "}
                <label className="text-[20px] font-medium">
                  <FormattedNumber value={customerData.membershipPoint} />
                </label>{" "}
                {t("points")}
              </div>
              {!!customerData.membershipPoint && (
                <div className="border rounded m-2">
                  <div className="m-5">
                    <p className="my-2 font-semibold">
                      <FormattedNumber value={customerData.membershipPoint} />{" "}
                      {t("points will expire on")}{" "}
                      {moment(customerData.membershipPointExpiryDate).format(
                        "DD MMM YYYY"
                      )}{" "}
                      {moment(customerData.membershipPointExpiryDate).format(
                        "hh:mm A"
                      )}
                    </p>
                    <p className="my-2">{t("Make just 1 points")}</p>
                    <a className="text-primary no-underline">
                      {t("Learn more")}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="p-5 sm:p-0">
          <h3>{t("My Detail")}</h3>
          <div
            className={["flex flex-wrap", classes["flex-with-gap"]].join(" ")}
          >
            <div className="w-full xs:w-[48%] pb-3">
              <RectTextInput
                label={t("firstName") + "*"}
                type="text"
                value={customerData?.firstName || ""}
                onChange={(e) => onChange(e, "firstName")}
                className=""
                name="firstName"
                errorMessage={inputError?.firstName || ""}
              />
            </div>
            <div className="w-full xs:w-[48%] pb-3">
              <RectTextInput
                label={t("lastName") + "*"}
                type="text"
                value={customerData?.lastName || ""}
                onChange={(e) => onChange(e, "lastName")}
                className=""
                name="lastName"
                errorMessage={inputError?.lastName || ""}
              />
            </div>

            <div className="w-full xs:w-[48%] pb-3">
              <RectDateInputWrapper
                label={t("Date of Birth") + "*"}
                className="w-full"
                errorMessage={inputError?.dateOfBirth || ""}
              >
                <SingleDatePicker
                  withPortal
                  numberOfMonths={1}
                  showDefaultInputIcon
                  inputIconPosition="after"
                  isOutsideRange={(day) => {
                    if (moment().diff(day) < 0) {
                      return true;
                    }
                  }}
                  disabled={
                    isSavingBirthDateFirstTime
                      ? false
                      : !(
                          customerData?.dateOfBirth === "" ||
                          customerData?.dateOfBirth === null
                        )
                  }
                  disableScroll
                  placeholder=""
                  displayFormat="DD/MM/YYYY"
                  readOnly
                  renderMonthElement={renderMonthElement}
                  navPrev={
                    <div className="prev">
                      <Image src={back} alt="prev" className="icon" />
                    </div>
                  }
                  navNext={
                    <div className="next">
                      <Image src={next} alt="next" className="icon" />
                    </div>
                  }
                  noBorder
                  date={
                    customerData?.dateOfBirth === "" ||
                    customerData?.dateOfBirth === null
                      ? null
                      : moment(new Date(customerData?.dateOfBirth))
                  } // momentPropTypes.momentObj or null
                  onDateChange={(date) => handleChangeBirthdayDate(date)} // PropTypes.func.isRequired
                  focused={focus} // PropTypes.bool
                  onFocusChange={({ focused }) => {
                    setFocus(focused);
                  }} // PropTypes.func.isRequired
                  id="your_unique_id" // PropTypes.string.isRequired
                />
              </RectDateInputWrapper>
            </div>
            <div className="w-full xs:w-[48%] pb-3">
              <RectSelectInput
                label={t("Gender") + "*"}
                name="gender"
                value={customerData?.gender || ""}
                onChange={(data) => {
                  setCustomerData({
                    ...customerData,
                    gender: data,
                  });
                  setInputError({
                    ...inputError,
                    gender: "",
                  });
                }}
                className="input-main-theme"
                data={gender}
                errorMessage={inputError.gender}
              />
            </div>

            <div className="w-full xs:w-[48%] pb-3">
              <div className="rounded-[5px] border border-solid w-full">
                <CustomPhoneInput
                  value={customerData.mobileNo || ""}
                  onChange={(data, e) => {
                    setCurrCountry(e.countryCode);
                    setCustomerData({
                      ...customerData,
                      mobileNo: "+" + data,
                    });
                  }}
                  name="mobileNo"
                  disabled={true}
                />
              </div>
            </div>

            {showCheckbox && (
            <div className="w-full pb-3">
              <Checkbox
                className="subscription-selection"
                checked={customerData.marketingConsent}
                onChange={(e) => {
                  setCustomerData({
                    ...customerData,
                    marketingConsent: !customerData.marketingConsent,
                  });
                }}
                styled={{
                  checkboxContainer: "pl-0",
                  checkbox: "border-gray-500",
                }}
                checkedStyled={{
                  checkbox: "bg-primary border-primary",
                }}
                name="Marketing Consent"
                label={
                  t("I'd like to receive") +
                  " " +
                  merchantName +
                  " " +
                  t("and its partners")
                }
              />
            </div>
            )}
          </div>

          <div className="w-full p-8px" />

          <div className="w-full p-2 text-right">
            <ContainedButton
              className="btn-save"
              border="rounded"
              loading={isLoading}
              onClick={() => handleOnSave("profile")}
            >
              {t("Save My Details")}
            </ContainedButton>
          </div>
         
          {showPassword && (  
            <>
            <div className="w-full p-2">
              <hr className="divider h-1px bg-grey-divider flex-shrink-0" />
            </div>

             {/* Password Part */}
            <div className="w-full">
              <h3 className="title">{t("Email and Password")}</h3>
            </div>
            <div className="w-full xs:w-1/2 p-2">
              <RectTextInput
                label={t("Email Address") + "*"}
                type="text"
                value={customerData?.primaryEmail || ""}
                onChange={onChange}
                className="input-main-theme"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
                name="primaryEmail"
                disabled
              />
            </div>

            <div className="w-full xs:w-1/2 p-2 text-right">
              <ContainedButton
                className="btn-save"
                border="rounded"
                onClick={() => {
                  setOpenChangePasswordModal(true);
                }}
              >
                {t("Change Password")}
              </ContainedButton>
            </div>

            <div className="w-full p-2">
              <hr className="divider h-1px bg-grey-divider flex-shrink-0" />
            </div>
            </>
          )}
        </div>

        <DialogModal
          className="text-center w-[420px]"
          open={openChangePasswordModal}
          onClose={() => setOpenChangePasswordModal(false)}
          title={t("Change Password")}
        >
          <RectTextInput
            label={t("Current Password") + "*"}
            type="password"
            value={passwordData.password}
            onChange={onChangePassword}
            className="my-4"
            name="password"
          />
          <RectTextInput
            label={t("New Password") + "*"}
            type="password"
            value={passwordData.newPassword}
            onChange={onChangePassword}
            className="my-4"
            name="newPassword"
          />
          <RectTextInput
            label={t("Re-type New Password") + "*"}
            type="password"
            value={passwordData.retypeNewPassword}
            onChange={onChangePassword}
            className="my-4"
            name="retypeNewPassword"
          />
          {error.item === "retypeNewPassword" && error.show ? (
            <div className="w-full text-[13px] my-3">
              <div className="w-full bg-red-100 text-red-600 border rounded p-2">
                {error.message}
              </div>
            </div>
          ) : null}
          <div className="my-6 flex justify-center items-center">
            <ContainedButton
              className="font-semibold w-full"
              onClick={() =>
                handleUpdatePassword().then((response) => {
                  if (response) {
                    setOpenChangePasswordModal(false);
                  }
                })
              }
              loading={isChangePasswordLoading}
              border="rounded"
              disabled={
                (error.item === "retypeNewPassword" && error.show) ||
                [
                  passwordData.password,
                  passwordData.newPassword,
                  passwordData.retypeNewPassword,
                ].includes("")
              }
            >
              {t("confirm")}
            </ContainedButton>
            <ContainedButton
              onClick={() => {
                setOpenChangePasswordModal(false);
              }}
              outlined={true}
              className="ml-3 w-full border-gray-300"
              border="rounded"
              disabled={isChangePasswordLoading}
            >
              {t("cancel")}
            </ContainedButton>
          </div>
        </DialogModal>
      </React.Fragment>
    </AccountSidebarLayout>
  );
};

export default Profile;
