// import { Divider } from "../productDetail/variants/ProductDetailVariant1";
// import { NextPage } from "next";

function ComponentResolver({
  dynamicProps,
  componentMap,
  blockKey,
  props,
}: {
  dynamicProps: any;
  componentMap: any;
  blockKey: string;
  props: any;
}) {
  const SelectedComponent = componentMap[blockKey];
  const dynamicProp = dynamicProps[blockKey];
  if (!SelectedComponent) return <></>;
  return <SelectedComponent {...props} {...dynamicProp} />;
}

const DynamicRenderer = ({
  structure,
  dynamicProps,
  componentMap,
  rootClassNames,
}: any) => {
  return (
    <div className={`w-full ${rootClassNames}`}>
      {structure?.map(
        ({ isFullWidth, sectionStyles, sectionName, children }) => {
          return (
            <div
              key={sectionName}
              className={`${
                !isFullWidth
                  ? "grid grid-cols-12 w-full max-w-6xl mx-auto"
                  : "grid grid-cols-12 w-full mx-auto"
              } ${sectionStyles}`}
            >
              {(children || []).map(
                ({ gridStyles, blockType, blockProps }, index) => {
                  return (
                    <div key={index} className={`${gridStyles} w-full`}>
                      <ComponentResolver
                        componentMap={componentMap}
                        dynamicProps={dynamicProps}
                        blockKey={blockType}
                        props={blockProps}
                      />
                    </div>
                  );
                }
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

export default DynamicRenderer;
