import { FiShoppingBag, FiTruck } from "react-icons/fi/index";
import useTranslation from 'next-translate/useTranslation';
import DeliverySettings from "../components/DeliverySettings";
import PickupSettings from "../components/PickupSettings";
import MerchantContext from "@/contexts/MerchantContext";
import { MdOutlineClose } from "react-icons/md/index";
import { useOrder } from "@/contexts/OrderContext";
import { Tab, Transition } from "@headlessui/react";
import { OrderTypes } from "@/enums/enums";
import { Dialog } from "@headlessui/react";
import {
  createContext,
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export const MultiStoreDeliveryContext = createContext({});

type TMultiStireDeliveryProvider = {
  deliveryStoreData?: any;
  pickupStoreData?: any;
  selectedStoreId?: string;
  merchantId: string;
};

export default function MultiStoreDeliveryProvider({
  children,
}: {
  children: ReactElement;
}) {
  const { handleChangeOrderType, orderType, setDeliveryAddress } = useOrder();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const merchantData = useContext(MerchantContext) as any;
  const { updateMerchantData, orderOption, merchantId, storeType, storeId } =
    merchantData;
  const isDelivery = () => orderType === OrderTypes.DELIVERY;
  const isMultistore = storeType === "multiOffline";
  const [modalState, setModalState] = useState<TMultiStireDeliveryProvider>({
    merchantId,
  });
  const [additionalModalInfo, setAdditionalModalInfo] = useState({
    delivery: {},
    pickup: {},
  });
  const { t } = useTranslation("common");

  const availableOptions = (
    allowedOrderOptions: string[],
    additionalModalProps: {
      delivery: any;
      pickup: any;
    }
  ) =>
    [
      {
        id: OrderTypes.DELIVERY,
        tabDisplay: (
          <div className="flex flex-col space-y-2 items-center">
            <FiTruck fontSize={30} />
            <p>{t("Delivery")}</p>
          </div>
        ),
        component(state: any, onChange: any, { onClose }: any) {
          return (
            <DeliverySettings
              defaultValue={state?.deliveryStoreData || {}}
              merchantId={state?.merchantId}
              {...additionalModalProps["delivery"]}
              onConfirm={(deliveryStoreData) => {
                onChange({ deliveryStoreData });
                onClose();
              }}
            />
          );
        },
      },
      {
        id: OrderTypes.PICKUP,
        tabDisplay: (
          <div className="flex flex-col space-y-2 items-center">
            <FiShoppingBag fontSize={30} />
            <p>{t("Pick Up")}</p>
          </div>
        ),
        component(state: any, onChange: any, { onClose }: any) {
          return (
            <PickupSettings
              {...additionalModalProps["pickup"]}
              defaultValue={state?.pickupStoreData || {}}
              merchantId={state?.merchantId}
              onConfirm={(pickupStoreData) => {
                onChange({ pickupStoreData });
                onClose();
              }}
            />
          );
        },
      },
    ].filter(({ id }) => allowedOrderOptions?.includes(id));

  const title = {
    [OrderTypes.DELIVERY]: t("I want my order to be delivered to"),
    [OrderTypes.PICKUP]: t("I will pick up my order at"),
  };

  const openMultiStoreModal = (
    additionalModalInfo?: Partial<{
      delivery: any;
      pickup: any;
    }>
  ) => {
    if (additionalModalInfo)
      setAdditionalModalInfo((p) => ({ ...p, ...additionalModalInfo }));
    setModalIsOpen(true);
  };

  const onCloseMultistoreModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const localStorageStoreSelection = JSON.parse(
      localStorage.getItem("fam@storeSelection")
    );
    if (localStorageStoreSelection) {
      setModalState(localStorageStoreSelection)
    }
  }, []);

  useEffect(() => {
    const deliveryModeModalState =
      modalState[isDelivery() ? "deliveryStoreData" : "pickupStoreData"] || {};
    const storeId =
      deliveryModeModalState[isDelivery() ? "selectedStoreId" : "storeId"];
    onStoreUpdate(storeId);
    if (isDelivery()) onUpdateDeliveryLocation(deliveryModeModalState);
    if (modalState.deliveryStoreData || modalState.pickupStoreData) {
      localStorage.setItem("fam@storeSelection", JSON.stringify(modalState));
    }
  }, [modalState]);

  function onStoreUpdate(storeId: string) {
    if (storeId) updateMerchantData({ ...merchantData, storeId });
  }

  function getSelectedStoreAddress() {
    const deliveryModeModalState =
      modalState[isDelivery() ? "deliveryStoreData" : "pickupStoreData"] || {};
    return deliveryModeModalState["storeName"] || "";
  }

  function onUpdateDeliveryLocation(deliveryOptionValue: any) {
    if (deliveryOptionValue) {
      const { addressDetail, selectedLatLng, address } = deliveryOptionValue;
      setDeliveryAddress((p: any) => ({
        ...p,
        postalCode: address,
        country: address,
        state: address,
        city: address,
        selectedLatLng,
        addressDetail,
        address,
      }));
    }
  }

  const onTabChange = (selected: TTabSelector<unknown, unknown>) =>
    handleChangeOrderType(selected?.id);

  const deliveryMode = {
    [OrderTypes.DELIVERY]: "delivery",
    [OrderTypes.PICKUP]: "pickup",
  }[orderType];

  const showModalInMultistoreOnAddCart = () => {
    let decision = false;
    const isDelivery = deliveryMode === "delivery";
    const isPickup = deliveryMode === "pickup";
    if (isDelivery) decision = !Boolean(modalState?.deliveryStoreData);
    else if (isPickup) decision = !Boolean(modalState?.pickupStoreData);
    else if (!isDelivery || !isPickup) decision = true;
    if (decision) openMultiStoreModal();
    return decision;
  };

  return (
    <MultiStoreDeliveryContext.Provider
      value={{
        showModalInMultistoreOnAddCart,
        getSelectedStoreAddress,
        openMultiStoreModal,
        deliveryMode,
        isMultistore,
        isDelivery,
        storeId,
      }}
    >
      <Modal isOpen={modalIsOpen} closeModal={onCloseMultistoreModal}>
        <div className="text-xl font-semibold m-0 text-black text-center py-5">
          {title[OrderTypes.DELIVERY]}
        </div>
        <TabSelector
          onStateUpdate={(s) => setModalState((p) => ({ ...p, ...s }))}
          tabProps={{ onClose: () => setModalIsOpen((v) => !v) }}
          selections={availableOptions(orderOption, additionalModalInfo)}
          componentState={modalState}
          onTabChange={onTabChange}
          selectedIndex={availableOptions(
            orderOption,
            additionalModalInfo
          )?.findIndex(({ id }) => id === orderType)}
        />
      </Modal>
      {children}
    </MultiStoreDeliveryContext.Provider>
  );
}

type TTabSelector<T, V> = {
  tabDisplay: ReactElement;
  id: string;
  component: (
    state: T,
    onChange: (state: T) => void,
    tabProps: V
  ) => ReactElement;
};

function TabSelector<T, V>({
  componentState,
  onStateUpdate,
  selectedIndex,
  onTabChange,
  selections,
  tabProps,
}: {
  onTabChange: (selected: TTabSelector<T, V>) => void;
  onStateUpdate: (state: T) => void;
  selections: TTabSelector<T, V>[];
  selectedIndex: number;
  componentState: T;
  tabProps: V;
}) {
  const { t } = useTranslation();
  return (
    <Tab.Group
      onChange={(i: number) => onTabChange(selections[i])}
      selectedIndex={selectedIndex}
    >
      <Tab.List className="flex space-x-1 p-2">
        {selections.map(({ id, tabDisplay }) => {
          return (
            <Tab
              key={id}
              className={({ selected }) =>
                `${"w-full py-2.5 text-sm font-medium leading-5 text-primary"} ${"ring-white ring-opacity-60 focus:outline-none focus:ring-2 "} ${!selected
                  ? "hover:bg-gray-100"
                  : "bg-white border-b-2 border-primary"
                }`
              }
            >
              {tabDisplay}
            </Tab>
          );
        })}
      </Tab.List>
      <Tab.Panels className="mt-2 w-full">
        {selections?.map(({ id, component }) => {
          return (
            <Tab.Panel key={id}>
              {component(componentState, onStateUpdate, tabProps)}
            </Tab.Panel>
          );
        })}
      </Tab.Panels>
    </Tab.Group>
  );
}

function Modal({ isOpen, closeModal, children }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={closeModal} className="relative z-40" as="div">
        <Transition.Child
          enter="ease-out duration-300"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveTo="opacity-0"
          as={Fragment}
        >
          <Dialog.Overlay
            className={"fixed inset-0 bg-black bg-opacity-30 h-full"}
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-auto  hide-scrollbar">
          <div className="flex min-h-full sm:items-center md:items-start md:py-10 justify-center text-center relative">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="w-full max-w-lg transform md:rounded bg-white text-left align-middle shadow-xl transition-all md:h-auto min-h-[80vh] relative border border-gray-200 ">
                <button
                  className="absolute top-1 right-1 p-2 hover:brightness-75 z-20 outline-none"
                  onClick={closeModal}
                >
                  <MdOutlineClose />
                </button>
                {children}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
