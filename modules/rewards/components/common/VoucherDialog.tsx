import { TbX } from "react-icons/tb";
import { Button, Dialog } from "react-vant";

export const VoucherDialog = ({
  open,
  setOpen,
  isLoading,
  title,
  content,
  closeAction,
  okAction,
}) => {
  if (!open) {
    return null;
  }

  return (
    <Dialog
      visible={open}
      showConfirmButton={false}
      closeIcon={
        <TbX className="w-8 h-8 hover:bg-grey-100 rounded-full text-[#4B5565] p-1" />
      }
      width="400px"
      closeOnClickOverlay
      onClose={() => setOpen(false)}
      closeable
    >
      <div className="flex flex-col p-6 w-full max-w-md">
        <label className="font-medium text-xl mb-2">{title}</label>
        <label className="text-[#364152]">{content}</label>
      </div>
      <div className="flex flex-row justify-end items-center bg-[#EEF2F6] p-2">
        <Button
          style={{
            borderRadius: "6px",
            border: "1px solid #0A2541",
            boxShadow:
              "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
            lineHeight: 1,
            fontSize: 14,
            color: "#0A2541",
            height: "auto",
            minHeight: 36,
            minWidth: 80,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          loading={isLoading}
          loadingSize="small"
          style={{
            borderRadius: "6px",
            backgroundColor: "#0A2541",
            border: "1px solid #0A2541",
            boxShadow:
              "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
            lineHeight: 1,
            fontSize: 14,
            color: "#FFF",
            marginLeft: 8,
            height: "auto",
            minHeight: 36,
            minWidth: 80,
          }}
          nativeType="submit"
          onClick={(e) => {
            e.stopPropagation();
            okAction();
            setOpen(false);
          }}
        >
          Send
        </Button>
      </div>
    </Dialog>
  );
};
