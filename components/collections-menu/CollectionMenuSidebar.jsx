import { useOrder } from "@/contexts/OrderContext";

const CollectionMenuSidebar = ({
  sideBarMenuList,
  collectionsMenuState,
  dispatchCollectionsMenuState,
}) => {
  const { orderType } = useOrder();
  return (
    <div className="mb-[5rem]">
      {sideBarMenuList?.length > 0 &&
        sideBarMenuList.map((menu, index) => (
          <div
            key={menu.homeCollectionId}
            className="relative w-full h-[4rem] cursor-pointer"
            onClick={() => {
              dispatchCollectionsMenuState({
                type: "select",
                homeCollectionId: menu.homeCollectionId,
                title: menu.title,
              });
              window.dataLayer.push({
                event: "collectionClicked",
                orderType: orderType,
                collectionId: menu.homeCollectionId,
                collectionTitle: menu.title,
              });
            }}
          >
            <div
              key={menu.homeCollectionId}
              className={`flex items-center pl-3 pr-3 border-b w-full h-full ${
                collectionsMenuState?.homeCollectionId === menu.homeCollectionId
                  ? "bg-primary opacity-20"
                  : ""
              }`}
            ></div>
            <div className="w-full h-full absolute top-0 left-0 flex text-center items-center justify-center px-3">
              <span
                className={
                  "text-[0.55rem] font-medium sm:text-sm leading-3 " +
                  (collectionsMenuState?.homeCollectionId ===
                  menu.homeCollectionId
                    ? "text-primary "
                    : "text-gray-700")
                }
              >
                {menu.title}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CollectionMenuSidebar;
