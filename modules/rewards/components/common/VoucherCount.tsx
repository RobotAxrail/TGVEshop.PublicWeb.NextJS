export const VoucherCount = ({ voucherCount }: { voucherCount: string }) => {
  return (
    <div className="text-sm px-2 py-0.5 mb-1 bg-[#EDFCF2] text-[#16B364] border-[0.5px] border-[#16B364] rounded-lg">{`${voucherCount} left`}</div>
  );
}