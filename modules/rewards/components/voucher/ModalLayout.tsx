import { Button } from "react-vant";

export function ConfirmDialog({
  closeLabel = "Cancel",
  confirmLabel = "Proceed",
  onClickConfirm,
  description,
  isLoading,
  onClose,
  title,
}: {
  onClickConfirm?: () => void;
  confirmLabel?: string;
  closeLabel?: string;
  description: string;
  onClose?: () => void;
  isLoading: boolean;
  title: string;
}) {
  return (
    <div className="flex flex-col p-4 items-center w-full text-center h-full">
      <div className="h-full flex flex-col space-y-4 pt-6 sm:pt-2">
        <div className="font-[500] text-[16px] text-black">{title}</div>
        <div className="text-[#697586] space-y-3">
          <p className="p-0 m-0 text-[14px]">{description}</p>
        </div>
      </div>
      <div className="flex flex-row w-full space-x-1 mt-10">
        {closeLabel && (
          <Button
            style={{ borderRadius: "6px" }}
            className="w-full"
            onClick={onClose}
            type="primary"
            plain
          >
            {closeLabel}
          </Button>
        )}
        {onClickConfirm && (
          <Button
            style={{ borderRadius: "6px" }}
            onClick={onClickConfirm}
            loading={isLoading}
            className="w-full"
            type="primary"
          >
            {confirmLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
