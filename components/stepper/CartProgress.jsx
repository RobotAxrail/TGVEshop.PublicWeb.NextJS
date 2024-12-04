// icons
import { CartIcon, DeliveryIcon, PaymentIcon } from "@/components/icons/Icons";

// use activeStep to indicate current step
const CartProgress = (props) => {
  const { activeStep } = props;
  const listOfSteps = [
    {
      icon: <CartIcon className="text-headerFooterFontColor w-5 h-5" />,
    },
    {
      icon: <DeliveryIcon className="text-headerFooterFontColor w-5 h-5" />,
    },
    {
      icon: <PaymentIcon className="text-headerFooterFontColor w-5 h-6" />,
    },
  ];
  return (
    <div className="px-5 pb-3 pt-0">
      <div className="mx-4 p-4">
        <div className="flex items-center">
          {listOfSteps.length > 0 &&
            listOfSteps.map((obj, index) => {
              return (
                <>
                  <div className="flex items-center  relative">
                    <div
                      className={[
                        "rounded-full p-2.5 w-10 h-10 ",
                        activeStep >= index ? " bg-primary " : "bg-slate-300",
                      ].join(" ")}
                    >
                      {obj.icon}
                    </div>
                  </div>
                  {index + 1 !== listOfSteps.length && (
                    <div
                      className={[
                        "flex-auto border-t-2 transition duration-500 ease-in-out",
                        activeStep > index
                          ? " border-primary "
                          : " border-slate-300 ",
                      ].join(" ")}
                    ></div>
                  )}
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CartProgress;
