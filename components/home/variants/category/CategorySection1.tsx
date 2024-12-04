import AspectRatioSquareContainer from "@/components/shared/AspectRatioSquareContainer";
import classes from "../../Home.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import useTranslation from 'next-translate/useTranslation';

export default function CategorySection1({
  categoryList,
}: {
  categoryList: any;
}) {
  const BUCKET_URL = process.env.BUCKET_URL;
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <>
      {categoryList?.length > 0 && (
        <div className={classes["card-collection-container"]}>
          <div className="px-2.5 pb-[2px] bg-inherit">
            <h5 className="font-semibold my-5 m-0 xs:text-xl text-[22px]">
              {t('Shop by category')}
            </h5>
            <div className="flex flex-nowrap overflow-auto">
              {categoryList.map((data: any, index: number) => {
                const imageDisplay = BUCKET_URL + data.collectionIcon;
                return (
                  <div
                    className="w-1/2 min-w-[160px] xs:max-w-auto sm:w-1/3 md:w-1/4 lg:w-1/6 p-1 flex-grow-0"
                    // value={data as any}
                    key={index}
                  >
                    <div
                      className="bg-white rounded-[10px] p-2.5 cursor-pointer flex flex-col justify-between h-full"
                      onClick={() => {
                        router.push({
                          pathname: data.collectionSeoUrl,
                        });
                      }}
                    >
                      <h5 className="pb-2 break-words text-base m-0 font-medium leading-tight">
                        {data.title}
                      </h5>
                      <AspectRatioSquareContainer className={""} rounded="none">
                        <Image
                          alt={data.seoTitle}
                          layout="fill"
                          objectFit="contain"
                          src={imageDisplay}
                          title={data.title}
                        />
                      </AspectRatioSquareContainer>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
