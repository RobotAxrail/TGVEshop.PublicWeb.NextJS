import voucher1 from "../../../public/assets/mock-images/vouchers/voucher1.svg";
import tamaguchi1 from "../../../public/assets/mock-images/item/tamaguchi.png";
import Image from "next/image";
import tamaguchi2 from "../../../public/assets/mock-images/tamaguchiitem.png";
import { Button } from "@/components/ui/button";
import CustomerCart from "@/components/eshop/CustomerCart";
import { GoArrowLeft } from "react-icons/go";
import { useRouter } from "next/router";
import carticon from "public/assets/images/carticon.svg";
import { set } from "lodash";
import { useContext, useEffect, useState } from "react";
import MerchantContext from "@/contexts/MerchantContext";
import { API, graphqlOperation } from "aws-amplify";

import {
  getProductDetails,
  listSimilarItems,
  listItemReviews,
} from "@/graphql/queries";
import { isLocalHost } from "@/utils/util";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import Cookies from "universal-cookie";
import {
  addItemToCustomerCart,
  updateItemInCustomerCart,
  removeItemFromCustomerCart,
} from "@/graphql/mutations";

import { getCustomerCarts } from "@/graphql/queries";
import { useCart } from "@/contexts/EShopCartContext";



// Mock Product Details (static data for testing purposes)
type GetCustomerCartsResponse = {
  data: {
    getCustomerCarts: {
      items: any[]; // Replace with your item type
      message: string;
      status: string;
    }
  }
};


type GetProductDetailsResponse = {
  data: {
    getProductDetails: {
      cover: string | null;
      description: string | null;
      discountPercentage: number | null;
      image: string | null;
      isPreOrder: boolean | null;
      message: string;
      modifierGroups: any | null; // Replace with specific type if needed
      priceComparedAtPriceRange: any | null;
      priceRange: any | null;
      productIsDisabled: boolean | null;
      productUOMs: any | null;
      status: string;
      timeslotType: string | null;
      timeslots: any | null;
      title: string | null;
      totalRatings: number | null;
      totalReviews: number | null;
      variantName1: string | null;
      variantName2: string | null;
      variantName3: string | null;
      variantValues1: any | null;
      variantValues2: any | null;
      variantValues3: any | null;
      video: string | null;
    }
  }
};


// Product Component
const Product = ({ product }) => {
  const cookie = new Cookies();
  const router = useRouter(); // Initialize useRouter
  const routerData = router.query;

  const { customerCart } = useCart();
  const merchantInfoContext = useContext(MerchantContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [isCartFetching, setIsCartFetching] = useState(true);
  const [cartList, setCartList] = useState([]);

  const getCartList = async () => {
    setIsCartFetching(true);

    try {
      let params = {
        customerId: "9b57555b-f8b4-423d-9899-49fa64048682",
        // cartChannel: redirect ? "WhatsApp": null
      };

      if (isLocalHost()) {
        params["merchantId"] = merchantInfoContext.merchantId;
      }
      const res = (await API.graphql(
        graphqlOperation(getCustomerCarts, params)
      )) as GetCustomerCartsResponse;
      
      const responseProductItem = res.data.getCustomerCarts.items;
      setCartList(responseProductItem ?? []);
      setIsCartFetching(false);
    } catch (error) {
      setIsCartFetching(false);
    }
  };

  useEffect(() => {
    getCartList();
  }, [merchantInfoContext]);

  const fetchProductDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!router.isReady || !router.query.product || !merchantInfoContext) {
        return;
      }

      const params = {
        seoUrl: `product/${router.query.product}`,
        storeId: merchantInfoContext.storeId,
        domain: merchantInfoContext.domain,
        storeType: merchantInfoContext.storeType,
      };

      if (isLocalHost()) {
        params["merchantId"] = merchantInfoContext.merchantId;
      }

      const { data } = (await API.graphql(
        graphqlOperation(getProductDetails, params)
      )) as GetProductDetailsResponse;
      if (data?.getProductDetails?.status === "false") {
        setError("Product not found");
        return;
      }

      setItemDetails(data);

    } catch (err) {
      console.error("Error fetching product details:", err);
      setError("Failed to fetch product details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchProductDetails();
    }
  }, [router.isReady, merchantInfoContext]);

  // Loading state
  if (!router.isReady || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );
  }

  // No data state
  if (!itemDetails?.getProductDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        Product not found
      </div>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleGotoCart = () => {
    router.push("/eshop/cart");
  };
  
  // Destructure the product details for easier access
  const productDetails = itemDetails.getProductDetails;

  const sessionId = cookie.get("sessionId");

  const signInData = cookie.get("signIn");

  const addItemToCart = async (quantity, orderType) => {
    try {
      let params = {
        merchantId: merchantInfoContext.merchantId,
        accessToken: signInData?.accessToken ?? "",
        mandatoryItem: true,
        itemId: productDetails.productUOMs[0].productUOMId,
        quantity: quantity,
        customerId: sessionId,
        itemProperty: "ProductUOM",
        selectedModifierGroups: [],
        storeId: merchantInfoContext?.storeId || "",
        salesChannelName: "Online Store",
        type: orderType.toLowerCase(), // Use the passed orderType
      };
  
      const res = await API.graphql(
        graphqlOperation(addItemToCustomerCart, params)
      );
  
      let resGetCustomerCart = await API.graphql(
        graphqlOperation(getCustomerCarts, {
          customerId: sessionId,
          merchantId: merchantInfoContext.merchantId
        })
      );
  
    } catch (error) {
      console.error("Add to cart failed: ", error);
      throw error; // Re-throw to be handled by caller
    }
  };


  const handleCart = () => {
    router.push("/eshop/cart"); // Navigate to /eshop
  };
  
  return (
    <div className="flex flex-col min-h-screen pb-[100px]">
      <div className="relative w-full max-h-[310px] min-h-[20vh] overflow-hidden rounded-none">
        {/* Image with null checks */}
        {productDetails?.image && (
          <img
            src={process.env.BUCKET_URL + productDetails.image}
            alt={productDetails.title || ""}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full max-h-[310px] object-cover"
          />
        )}

        {/* Rest of your JSX with null checks */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15, 3, 4, 0) 0%, #111111 100%)",
          }}
        />

        <div className="absolute inset-0 flex items-start justify-start p-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center py-5">
              <GoArrowLeft
                size={16}
                onClick={handleBack}
                className="cursor-pointer"
              />
              <h2 className="text-white font-medium text-[16px] px-2 py-1">
                {productDetails.title}
              </h2>
            </div>
            <div className="relative h-[35px] w-[35px] rounded-full border-[1px] border-[#F4F4F5] flex items-center justify-center bg-[#2A2A2A] cursor-pointer">
          <Image
            src={carticon}
            alt="cart"
            width={20}
            height={20}
            onClick={handleCart}
          />
          {customerCart.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-[#FF0013] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {customerCart.length}
            </div>
          )}
        </div>
          </div>
        </div>
      </div>

      <div className="px-4 flex flex-col gap-5 mb-40">
        <div className="flex flex-col gap-2">
          <h1 className="font-normal text-[14px]">{productDetails.title}</h1>
          <p className="font-semibold text-[14px]">
            RM{productDetails.productUOMs[0].price.toFixed(2)}
          </p>
        </div>
        <div>
          <hr className="h-px bg-[#D4D4D426] border-0" />
        </div>
        <div className="text-[#D4D4D4] font-normal text-[14px]">
          {productDetails.description && (
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              className="text-[#D4D4D4] font-normal text-[14px]"
            >
              {productDetails.description}
            </ReactMarkdown>
          )}
        </div>
      </div>
      <div className="">
        <CustomerCart
          price={productDetails.productUOMs[0].price.toFixed(2) || 0} addItemToCart={addItemToCart}
        />
      </div>
    </div>
  );
};



export default Product;
