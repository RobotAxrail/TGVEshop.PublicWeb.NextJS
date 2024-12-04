import { VoucherIcon } from "@/components/image/VoucherIcon";
import dayjs from "dayjs";
import { TbX } from "react-icons/tb";
import { Dialog, Image } from "react-vant";
import { VoucherCount } from "../common/VoucherCount";

export const VoucherDetailModal = ({ data, isViewing, setIsViewing }) => {
  const {
    expiryDate,
    voucherIcon,
    remainingQuantity,
    title,
    pendingReceiverAccept,
    description,
  } = data;

  return (
    <Dialog
      visible={isViewing}
      showConfirmButton={false}
      closeIcon={
        <TbX className="w-8 h-8 hover:bg-grey-100 rounded-full text-[#4B5565] p-1" />
      }
      width="50%"
      style={{
        outerHeight: "400px",
      }}
      closeOnClickOverlay
      onClose={() => setIsViewing(false)}
      closeable
    >
      <div className="py-6 pl-6 flex flex-col xl:flex-row justify-center items-center xl:items-start w-full">
        <Image
          className="w-full mb-4 xl:mb-0"
          style={{ maxWidth: "240px", borderRadius: "6px", aspectRatio: 1 }}
          src={`${process.env.BUCKET_URL}${voucherIcon}`}
          fit="contain"
          radius="8px"
        />

        <div className="flex-3 justify-start items-start w-full h-full max-h-[60vh] flex flex-col space-y-2 ml-6 pr-6 overflow-y-auto">
          <div className="w-fit">
            <VoucherCount voucherCount={remainingQuantity} />
          </div>

          <label className="font-medium text-lg">{title}</label>

          <label className="text-sm text-[#697586]">{`Valid till ${dayjs(
            expiryDate
          ).format("DD MMM YYYY")}`}</label>

          {!!pendingReceiverAccept && (
            <div>
              <div className="text-sm flex content-center">
                <div className="flex items-center justify-center h-5 w-5">
                  <VoucherIcon />
                </div>
                <label className="text-sm text-[#697586] ml-2">{`${pendingReceiverAccept} voucher pending sharing`}</label>
              </div>
            </div>
          )}

          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="mb-auto h-full"
          ></div>
        </div>
      </div>
    </Dialog>
  );
};
