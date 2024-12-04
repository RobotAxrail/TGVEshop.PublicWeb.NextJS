export default function StoreLocationCard({
  storeName = "Family Mart",
  pickupStart = "9:00am",
  onSelectStoreLocation,
  pickupEnd = "9:00pm",
  distance = "15.5km",
  id = "hello",
  isSelected,
}: {
  onSelectStoreLocation: () => void;
  pickupStart?: string;
  isSelected: boolean;
  pickupEnd?: string;
  storeName?: string;
  distance?: string;
  id?: string;
}) {
  return (
    <div
      onClick={onSelectStoreLocation}
      className={`cursor-pointer p-2 flex flex-row items-center gap-3 ${
        isSelected ? "bg-blue-100 rounded" : ""
      }`}
    >
      <div
        className={`min-w-[20px] min-h-[20px] rounded-full ${
          isSelected
            ? "border-primary border-4 bg-white"
            : "border-gray-200 border"
        } `}
      />
      <div className="flex flex-col gap-0 overflow-hidden">
        <p className="m-0 text-sm font-medium whitespace-nowrap text-ellipsis overflow-hidden">
          {storeName}
        </p>
        {/* {pickupStart}-{pickupEnd} */}
        <div className="flex flex-col text-sm">
          <p className="m-0 text-gray-600">({distance})</p>
        </div>
      </div>
    </div>
  );
}
