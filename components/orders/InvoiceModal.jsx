import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useTranslation from "next-translate/useTranslation";

// components
import DialogModal from "@/components/dialog/DialogModal";
import { CloseIcon } from "@/components/icons/Icons";
import { Invoice } from "@/components/orders/Invoice";
import { ContainedButton } from "@/components/buttons/Buttons";

// styles
import styles from "./InvoiceModal.module.scss";

const InvoiceModal = ({ printModalState = {} }) => {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const { t } = useTranslation("common");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    if (printModalState.show) {
      setShowPrintModal(true);
    }
  }, [printModalState]);

  const handleClose = () => {
    setShowPrintModal(false);
  };

  return (
    <DialogModal
      className={[
        styles["invoice_modal"],
        "max-h-screen w-90% my-5 xs-down:px-1",
      ].join(" ")}
      smallDialog={false}
      onClose={handleClose}
      open={showPrintModal}
    >
      <div className="text-left">
        <div className="flex justify-between">
          <h2 className="">{printModalState.title}</h2>
          <button
            className="
            p-3
            justify-center items-center 
            select-none 
            rounded-full
            outline-none
            hover:bg-black hover:bg-opacity-5"
            onClick={handleClose}
          >
            <span className="flex w-full">
              <CloseIcon size="w-5 h-5" viewBox="0 0 24 24" />
            </span>
          </button>
        </div>

        <div className={styles["print-content"]} ref={componentRef}>
          <Invoice item={printModalState.content} />
        </div>

        <div className="btn-group text-right">
          <ContainedButton
            onClick={handleClose}
            border="rounded"
            outlined={true}
            className="border-primary mr-2 font-semibold"
            fontSize="text-14px"
          >
            {t("cancel")}
          </ContainedButton>
          <ContainedButton
            onClick={handlePrint}
            border="rounded"
            className="font-semibold"
            fontSize="text-14px"
          >
            <svg
              className="mr-2 -ml-1 w-5 h-5"
              fill="currentColor"
              focusable={false}
              viewBox="0 0 24 24"
            >
              <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" />
            </svg>
            {t("Print")}
          </ContainedButton>
        </div>
      </div>
    </DialogModal>
  );
};
export default InvoiceModal;
