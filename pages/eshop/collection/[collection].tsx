import React, { useContext, useEffect, useMemo, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import tamaguchi2 from "../../../public/assets/mock-images/tamaguchiitem.png";
import { useRouter } from "next/router";
import { listItemsByCollection } from "@/graphql/queries";
import MerchantContext from "@/contexts/MerchantContext";
import { API, graphqlOperation } from "aws-amplify";
import CollectionCart from "@/components/eshop/cart/CollectionCart";



type ListItemsByCollectionResponse = {
  data: {
    listItemsByCollection: {
      items: any[];
      message: string;
      status: string;
      productCollectionName: string;
    }
  }
};

const Category = () => {

  type Cart = {
    [key: string]: {
      quantity: number;
      seoUrl: string;
      price: number;
    };
  };
  
  const [cart, setCart] = useState<Cart>({}); // State to track quantities for each item
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const merchantInfoContext = useContext(MerchantContext);
  const [collections, setCollections] = useState({
    listItemsByCollection: {
      items: [],
      productCollectionName: ""
    }
  });
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const total = collections.listItemsByCollection.items.reduce((sum, item) => {
      return sum + item.price * (cart[item.itemId]?.quantity || 0);
    }, 0);

    setTotalPrice(total);
  }, [cart, collections.listItemsByCollection.items]);
  
  const { seoUrl } = router.query;

  const fetchItemsByCollection = async (collection) => {
    try {
      const params = {
        seoUrl: `collection/${router.query.collection}`,
        storeId: merchantInfoContext.storeId,
        filter: {},
        limit: 20,
        nextToken: 0,
        orderType: merchantInfoContext.orderOption[1].toLocaleLowerCase(),
        sort: {field: "title", direction: "asc"},
        merchantId: merchantInfoContext.merchantId
      };

      const { data } = (await API.graphql(
        graphqlOperation(listItemsByCollection, params)
      )) as ListItemsByCollectionResponse;

      if(data ){
        setCollections(data);
      }

    }catch(error){
      console.error("Error fetching items by collection", error);
    }
  }
  

  useEffect(() => {
    fetchItemsByCollection(seoUrl);
  }, [seoUrl]);

  // Mock data
 
  const handleBack = () => {
    router.back(); // Navigate to /eshop
  };

  const incrementQuantity = (itemId, seoUrl,price) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: {
        quantity: (prev[itemId]?.quantity || 0) + 1,
        seoUrl: seoUrl,
        price:price
      },
    }));
  };
  
  const decrementQuantity = (itemId) => {
    setCart((prev) => {
      const currentQuantity = prev[itemId]?.quantity || 0;
      if (currentQuantity > 1) {
        return {
          ...prev,
          [itemId]: {
            quantity: currentQuantity - 1,
            seoUrl: prev[itemId].seoUrl, // Retain the correct seoUrl
            price: prev[itemId].price
          },
        };
      } else {
        // Remove the item from the cart
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
    });
  };
  
  // const filteredItems = useMemo(() => {
  //   if (selectedCategory === "All") {
  //     return collections?.listItemsByCollection.items;
  //   }
  //   return collections?.listItemsByCollection.items.filter(
  //     (item) => item.homeCollectionTitle === selectedCategory
  //   );
  // }, [selectedCategory]);

  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="flex items-center py-4">
        <GoArrowLeft
          size={16}
          onClick={handleBack}
          className="cursor-pointer"
        />
        <h2 className="text-white font-medium text-[16px] px-2 py-1">
          {collections?.listItemsByCollection?.productCollectionName}
        </h2>
      </div>
      {/* <div className="flex gap-2 overflow-x-auto whitespace-nowrap no-scrollbar">
        {["All", "Original Tamagotchi", "Tamagotchi Connection", "Tamagotchi Plus"].map(
          (category) => (
            <button
              key={category}
              className={`px-[10px] py-2 border rounded-full font-normal text-[13px] ${
                selectedCategory === category
                  ? "bg-white text-black"
                  : "bg-transparent text-white border-white"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          )
        )}
      </div> */}

      {/* Render items */}
      <div className="flex flex-col gap-4">
      {collections.listItemsByCollection.items.map((item) => (
            // Add font-size: 0 to the wrapper div to remove any line-height spacing
            <div className="" key={item?.itemId}>
              <div className="flex gap-[10px]">
                <div className="w-[100px] h-[100px] relative flex-shrink-0" 
                  onClick={() => router.push(`/eshop/${item.seoUrl}`)}>
                  {/* <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="object-cover block rounded-[10px]"
                  /> */}
                  <img src = {process.env.BUCKET_URL +item.cover} className="object-cover block rounded-[10px] w-[100px] h-[100px]"/>
                </div>

                <div className="flex flex-col justify-between">
                  <div className = "flex flex-col gap-[6px]">
                    <h1 className="font-normal text-[14px] text-[#D4D4D4]">{item.title}</h1>
                    <p className="font-medium text-[14px]">RM{item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex gap-4">
                    <div
                      className="w-[22.5px] h-[22.5px] border-[1px] border-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer"
                      onClick={() => decrementQuantity(item.itemId)}
                    >
                      <Minus size={8.25} />
                    </div>
                    <div>{cart![item.itemId]?.quantity || 0}</div>
                    <div
                      className="w-[22.5px] h-[22.5px] border-[1px] border-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer"
                      onClick={() => incrementQuantity(item.itemId, item.seoUrl, item.price)}
                    >
                      <Plus size={8.25} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
        <CollectionCart cart = {cart}/>
    </div>
  );
};

export default Category;
