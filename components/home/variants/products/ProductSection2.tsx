import classes from "./Product.module.scss";
import {
  BsChevronCompactLeft,
  BsChevronCompactRight,
} from "react-icons/bs/index";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useTranslation from 'next-translate/useTranslation';

export default function ProductSection2({
  landingPageProduct,
  setItem,
}: {
  landingPageProduct: any;
  setItem: any;
}) {
  const [selectedCollection, setSelectedCollection] = useState<any>();
  const horizontalScroll = useRef();
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    setSelectedCollection(landingPageProduct[0]);
  }, [landingPageProduct]);

  const onLeftClick = () => {
    if (horizontalScroll.current)
      (horizontalScroll.current as any).scrollLeft -= 200;
  };

  const onRightClick = () => {
    if (horizontalScroll.current)
      (horizontalScroll.current as any).scrollLeft += 200;
  };

  return (
    <section className="p-4 md:p-0 flex flex-col items-center gap-16 w-full overflow-x-hidden my-8">
      <div className="flex flex-col items-center gap-6 w-full overflow-x-hidden">
        <p
          className="text-center text-xl m-0 text-gray-700"
          style={{
            font: "normal normal normal 20px/22px Georgia",
            color: "#202020",
          }}
        >
          {t('FEATURED COLLECTIONS')}
        </p>

        <div className="w-full flex flex-row items-center justify-center">
          <div
            ref={horizontalScroll}
            className={[
              "w-full overflow-x-auto scroll-smooth",
              classes.noScrollbar,
            ].join(" ")}
          >
            <div className="flex flex-row gap-9 min-w-[200px] justify-start md:justify-center">
              {landingPageProduct
                .sort(({ sequence: sA }, { sequence: sB }) => sA - sB)
                .slice(0, 2)
                .map((props: any) => (
                  <TabButton
                    onSelect={() => setSelectedCollection(props)}
                    title={props?.homeCollectionTitle}
                    key={props?.sequence}
                    selected={
                      props?.homeCollectionTitle ===
                      selectedCollection?.homeCollectionTitle
                    }
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {selectedCollection?.items?.slice(0, 4).map((data, i) => (
          <ProductSection2Card key={i} data={data} />
        ))}
      </div>
      <button
        className="duration-100 text-sm md:text-xl bg-primary px-2 md:px-4 py-3 md:py-4 rounded-sm w-[100%] md:w-[40%] text-black hover:brightness-90"
        style={{ font: "normal normal normal 20px/22px Georgia" }}
        onClick={() =>
          router.push({
            pathname: `/${selectedCollection?.productCollectionSeoUrl}`,
          })
        }
      >
        {t('VIEW ALL PRODUCTS')} 
      </button>
    </section>
  );
}

function TabButton({
  selected,
  onSelect,
  title,
}: {
  onSelect: () => void;
  selected: boolean;
  title: string;
}) {
  return (
    <div className="flex flex-col">
      <button
        className="duration-100 text-2xl m-0 cursor-pointer text-gray-800 hover:text-gray-500 whitespace-nowrap uppercase font-playFair"
        style={{ font: "normal normal 600 28px/37px Playfair Display" }}
        onClick={onSelect}
      >
        {title}
      </button>
      {selected && <div className="bg-primary h-[2px]" />}
    </div>
  );
}

function ProductSection2Card({ data }) {
  const router = useRouter();
  const goToPage = () =>
    router.push({
      pathname: `/${data.seoUrl}`,
      state: data,
    } as any);

  return (
    <div className="col-span-2 lg:col-span-1 overflow-hidden cursor-pointer">
      <div className="flex flex-col items-center gap-9">
        <img
          className="aspect-square rounded-md object-cover border-[1px]"
          src={process.env.BUCKET_URL + data.cover}
          onClick={() => goToPage()}
        />
        <p
          className="text-md md:text-xl font-extralight text-center text-ellipsis font-playFair"
          style={{ font: "normal normal normal 20px/27px Playfair Display" }}
        >
          {data.title}
        </p>
      </div>
    </div>
  );
}
