import { useRouter } from "next/router";
import useTranslation from 'next-translate/useTranslation';

type CollectionCardType = {
  collectionIcon: string;
  collectionId: string;
  collectionImage: string;
  collectionName: string;
  collectionSeoUrl: string;
  createdAt: string;
  createdBy: string;
  effectiveEndDateTime: string;
  effectiveStartDateTime: string;
  homeCollectionId: string;
  homeCollectionType: string;
  isDisabled: boolean;
  merchantId: string;
  sequence: string;
  title: string;
  updatedAt: string;
  updatedBy: string;
};

export default function CategorySection2({
  categoryList,
}: {
  categoryList: CollectionCardType[];
}) {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 m-auto p-4 md:p-0">
      {categoryList.slice(0, 6).map((data, index) => (
        <CategorySection2Cards key={index} {...data} />
      ))}
    </section>
  );
}

function CategorySection2Cards({ collectionIcon, collectionSeoUrl, title }) {
  const BUCKET_URL = process.env.BUCKET_URL;
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <div
      style={{ backgroundImage: `url('${BUCKET_URL + collectionIcon}')` }}
      onClick={() => router.push({ pathname: collectionSeoUrl })}
      className={
        "bg-cover border-dark-200 rounded-md col-span-1 cursor-pointer relative pb-[125%]"
      }
    >
      <div className="h-full w-full bg-gray-800 md:p-6 p-2 rounded-md bg-opacity-40 absolute">
        <div className="flex flex-col justify-end h-full gap-1 md:gap-2 text-white">
          <p
            className="text-lg md:text-2xl m-0 font-semibold uppercase mt-2 mb-3 font-playFair"
            style={{ font: "normal normal 600 Playfair Display" }}
          >
            {title}
          </p>
          <button
            className="duration-100 text-xs md:text-lg bg-white px-3 py-2 md:px-6 md:py-4 rounded w-fit text-black hover:brightness-90"
            onClick={() => router.push({ pathname: collectionSeoUrl })}
          >
            {t('VIEW PRODUCTS')}
          </button>
        </div>
      </div>
    </div>
  );
}
