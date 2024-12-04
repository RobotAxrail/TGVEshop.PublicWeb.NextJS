import { Popup, Image } from "react-vant";
import { ReactElement } from "react";

// Children is the bottom action section for this voucher card detail
export default function DetailVoucher({
  description,
  secondary,
  children,
  onClose,
  title,
  image,
  open,
}: {
  children: ReactElement;
  description: string;
  onClose: () => void;
  secondary: string;
  title: string;
  image: string;
  open: boolean;
}) {
  return (
    <Popup
      className="md:rounded-md max-w-xl w-full md:h-auto h-screen"
      onClose={onClose}
      visible={open}
      lockScroll
      closeable
    >
      <div className="flex flex-col p-4  h-full">
        <div className="w-full flex flex-row space-x-3">
          <div>
            <Image
              className="rounded-md border object-cover"
              src={`${process.env.BUCKET_URL}${image}`}
              height={"150px"}
              width={"150px"}
              alt={title}
            />
          </div>

          <div className="flex flex-col items-start space-y-3">
            <div className="text-[16px] font-[400] line-clamp-2">{title}</div>
            <div className="text-[14px] text-primary">{secondary}</div>
          </div>
        </div>
        <div
          className="my-2 h-full overflow-y-auto hide-scrollbar"
          dangerouslySetInnerHTML={{ __html: `${description}` }}
        />
        {children}
      </div>
    </Popup>
  );
}
