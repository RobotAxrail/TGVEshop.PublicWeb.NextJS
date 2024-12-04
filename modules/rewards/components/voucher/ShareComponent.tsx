import { setToastState } from "@/states/toastBarState";
import { useMutation } from "@tanstack/react-query";

import { shareMyVoucher } from "modules/rewards/api";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { TbMinus, TbPlus } from "react-icons/tb";
import { Button, Field, Form } from "react-vant";
import Cookies from "universal-cookie";
import { SuccessDialog } from "../common/SuccessDialog";
import { VoucherDialog } from "../common/VoucherDialog";

export const ShareComponent = ({ popupData }) => {
  const { remainingQuantity, voucherId, title } = popupData;
  const cookie = new Cookies();
  const { t } = useTranslation();
  const [counter, setCounter] = useState(1);
  const [recipientValue, setRecipientValue] = useState("");
  const [type, setType] = useState("mobileNo");
  const [openSendDialog, setOpenSendDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [formData, setFormData] = useState(null);
  const [form] = Form.useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: shareMyVoucher,
    mutationKey: ["shareVoucher"],
    onSuccess: (data) => {
      const isSuccess = data?.status === "true";
      if (isSuccess) {
        setOpenSuccessDialog(true);
      } else
        setToastState({
          message: data?.message,
          severity: "error",
          show: true,
        });
    },
  });

  function onSend() {
    mutate({
      customerId: (cookie.get("signIn") as any)?.customerId,
      voucherCode: voucherId,
      quantity: counter,
      receiverContactType: type,
      ...(type === "mobileNo"
        ? { receiverNumber: `+60${formData?.mobileNo}` }
        : { receiverEmail: formData?.email }),
    });
  }

  return (
    <Form
      form={form}
      onFinish={(data) => {
        setOpenSendDialog(true);
        setFormData(data);
      }}
    >
      <div className="flex flex-col justify-end items-start h-full">
        <label className="text-sm my-4">
          Enter your friends phone number or email below or add from your
          contacts
        </label>

        <label className="mb-2 text-sm">
          {type === "mobileNo" ? "Phone number" : "Email"}
        </label>

        <div className="w-full after:mt-6">
          {type === "mobileNo" ? (
            <Form.Item
              name="mobileNo"
              rules={[
                {
                  required: true,
                  pattern: /^(1)[0|1|2|3|4|6|7|8|9]-*[0-9]{7,8}$/,
                  message: "Please enter valid phone number",
                },
              ]}
              style={{
                padding: 0,
                border: "none",
              }}
            >
              <Field
                value={recipientValue}
                onChange={(e) => setRecipientValue(e)}
                type="digit"
                align="left"
                prefix="+60"
                maxLength={9}
                style={{
                  border: "1px solid #EEF2F6",
                  borderRadius: "6px",
                  textAlign: "left",
                  marginBottom: "2px"
                }}
              />
            </Form.Item>
          ) : (
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  pattern: /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i,
                  message: "Please enter valid email",
                },
              ]}
              style={{
                padding: 0,
                border: "none",
              }}
            >
              <Field
                value={recipientValue}
                onChange={(e) => setRecipientValue(e)}
                type="text"
                align="left"
                placeholder="example@mail.com"
                style={{
                  border: "1px solid #EEF2F6",
                  borderRadius: "6px",
                  textAlign: "left",
                  marginBottom: "2px"
                }}
              />
            </Form.Item>
          )}
        </div>

        <Button
          style={{
            borderRadius: "4px",
            border: "none",
            lineHeight: 1,
            fontSize: 14,
            color: "#008CDC",
            padding: 4,
            minWidth: 0,
            height: 24,
            marginTop: 4
          }}
          plain
          onClick={(e) => {
            e.stopPropagation();
            setRecipientValue("");
            if (type === "mobileNo") {
              setType("email");
            } else {
              setType("mobileNo");
            }
          }}
        >
          {`Send via ${type == "mobileNo" ? "email" : "phone number"}`}
        </Button>

        <div className="flex flex-row justify-end items-center self-end justify-self-end mt-8">
          <div className="flex flex-row mt-auto border border-[#EEF2F6] rounded-md">
            <Button
              className="hover:bg-[#EEF2F6]"
              icon={
                <TbMinus
                  style={{
                    fontSize: "18px",
                    color: "#4B5565",
                  }}
                />
              }
              style={{
                borderRadius: "6px",
                border: "none",
                padding: 0,
                minWidth: 44,
                ":hover": {
                  backgroundColor: "#EEF2F6",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                setCounter(counter - 1);
              }}
              disabled={counter === 1}
            ></Button>

            <Field
              readOnly
              value={`${counter}`}
              type="number"
              align="center"
              style={{ width: 44 }}
            />

            <Button
              className="hover:bg-[#EEF2F6]"
              icon={
                <TbPlus
                  style={{
                    fontSize: "18px",
                    color: "#4B5565",
                  }}
                />
              }
              style={{
                borderRadius: "6px",
                border: "none",
                padding: 0,
                minWidth: 44,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setCounter(counter + 1);
              }}
              disabled={counter === remainingQuantity}
            ></Button>
          </div>

          <Button
            loading={isLoading}
            disabled={remainingQuantity < 1}
            style={{
              borderRadius: "6px",
              padding: "4px 28px",
              boxShadow:
                "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
              fontSize: 14,
              marginLeft: 8,
            }}
            size="normal"
            block
            type="primary"
            nativeType="submit"
          >
            Send Voucher
          </Button>
        </div>
      </div>

      <VoucherDialog
        open={openSendDialog}
        setOpen={setOpenSendDialog}
        isLoading={isLoading}
        title="Share Voucher"
        content={`Are you sure you want to send this voucher to ${
          type === "mobileNo" ? `+60${formData?.mobileNo}` : formData?.email
        }?`}
        closeAction={() => {}}
        okAction={onSend}
      />

      <SuccessDialog
        open={openSuccessDialog}
        setOpen={setOpenSuccessDialog}
        recipientValue={
          type === "mobileNo" ? `+60${formData?.mobileNo}` : formData?.email
        }
        voucherTitle={title}
        quantity={counter}
      />
    </Form>
  );
};
