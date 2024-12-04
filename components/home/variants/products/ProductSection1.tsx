const Item = dynamic(() => import("@/components/collection/Item"));
import { ContainedButton } from "@/components/buttons/Buttons";
import dynamic from "next/dynamic";
import useTranslation from 'next-translate/useTranslation';

import { useRouter } from "next/router";
export default function ProductSection1({
  landingPageProduct,
  setItem,
  isQLEggs,
}: {
  landingPageProduct: any;
  setItem: any;
  isQLEggs: Boolean;
}) {
  console.log(setItem);
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <>
      {landingPageProduct?.map((item, idx) => {
        if (item?.items?.length === 0) {
          return null;
        }
        return (
          <div className="mb-5" key={idx}>
            <div className="px-2.5 pb-[2px] bg-inherit">
              <div className="flex items-center my-2.5 overflow-hidden">
                <h5 className="text-left font-semibold flex-[6] m-0 xs:text-xl text-[22px]">
                  {item?.homeCollectionTitle}
                </h5>
                {item?.items?.length >= 4 && (
                  <div className="flex-[4] flex justify-end">
                    <ContainedButton
                      onClick={() => {
                        router.push({
                          pathname: `/${item?.productCollectionSeoUrl}`,
                        });
                      }}
                      outlined={true}
                      className="border-gray-300 uppercase h-12"
                      fontSize="text-[13px]"
                      color="text-body"
                    >
                      {t('View All')}
                    </ContainedButton>
                  </div>
                )}
              </div>
              {/* TODO: Can't fix itemPerPage to 4. It only works on desktop */}
              {item?.items?.length > 0 && (
                <Item
                  className="min-h-[164px] overflow-auto w-full"
                  itemList={item?.items}
                  handleItemClick={(selectedItem) => setItem(selectedItem)}
                  itemPerPage={4}
                  isQLEggs={isQLEggs}
                />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
