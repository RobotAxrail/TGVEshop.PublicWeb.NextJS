import React from "react";
import Image from "next/image";
// component
import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";
import { ContainedButton } from "@/components/buttons/Buttons";
// icons
import { CloseIcon } from "@/components/icons/Icons";
import Link from "next/link";

const Card = (props) => {
  const {
    itemObj,
    containedButtonAction = () => {},
    removeButtonAction = () => {},
  } = props;
  const itemImage = process.env.BUCKET_URL + itemObj.itemImage;

  return (
    <div className="px-4 ">
      <div className="bg-white p-6 rounded-lg shadow-lg flex">
        <div className="w-[100px] h-[100px] my-auto mx-6">
          <Image
            alt={itemObj.itemTitle}
            src={itemImage}
            layout="responsive"
            width={100}
            height={100}
          />
        </div>
        <div className="flex-col grow">
          {/* <div className="flex items-baseline">
            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
              New
            </span>
            <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
              2 baths &bull; 3 rooms
            </div>
          </div> */}

          <h4 className="mt-1 text-sm md:text-md font-semibold uppercase leading-tight truncate">
            <Link passHref href={`/${itemObj.itemSeoUrl}`}>
              <a className="no-underline">{itemObj.itemTitle}</a>
            </Link>
          </h4>

          <div className="mt-1">
            <PriceWithCurrency value={itemObj.deliveryPriceWithTax} />
          </div>
          <div className="mt-4">
            <ContainedButton
              outlined={true}
              className="wish-list-button border-primary min-w-max w-full"
              fontSize=""
              onClick={containedButtonAction}
            >
              Add to Cart
            </ContainedButton>
            {/* <span className="text-teal-600 text-md font-semibold">
              4/5 ratings{" "}
            </span>
            <span className="text-sm text-gray-600">
              (based on 234 ratings)
            </span> */}
          </div>
        </div>
        <div>
          <button
            title="remove"
            className="select-none rounded-full outline-none text-[grey] hover:bg-black hover:bg-opacity-5"
            onClick={removeButtonAction}
          >
            <span className="flex justify-inherit items-inherit">
              <CloseIcon size="w-6 h-6" viewBox="0 0 24 24" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export { Card };
