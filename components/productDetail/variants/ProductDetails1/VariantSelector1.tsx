import { VariantButton } from "@/components/buttons/Buttons";

export default function VariantSelector1({
  defaultVariantStructure,
  onVariantSelected,
  checkOosOption,
  productUOMs,
  variantMap,
}) {
  const onClickVariant = (v, s) => {
    const updatedMap = {
      ...variantMap,
      [v]: s,
    };
    const selectedUOM = productUOMs.filter(
      ({
        variantName1,
        variantName2,
        variantName3,
        variantValue1,
        variantValue2,
        variantValue3,
      }) => {
        const ret = [
          { n: variantName1, id: 0 },
          { n: variantName2, id: 1 },
          { n: variantName3, id: 2 },
        ]
          .filter(({ n }) => Boolean(n))
          .map(({ n, id }) => {
            const values = [variantValue1, variantValue2, variantValue3];
            return { k: n, v: values[id] };
          });
        const testRes = ret.every(({ k, v }) => updatedMap[k] === v);
        return testRes;
      }
    );
    if (selectedUOM?.length > 0) onVariantSelected(updatedMap, selectedUOM[0]);
    else onVariantSelected(updatedMap, null);
  };

  return (
    <div className="flex flex-col gap-3 my-2">
      {defaultVariantStructure?.map(({ name, id: variantId, selections }) => (
        <div className="flex flex-col gap-[0.5px]" key={variantId}>
          <span className="font-medium">{name}</span>
          <div className="flex flex-row gap-1 flex-wrap">
            {selections.map(({ id: selectionId, label }) => {
              return (
                <VariantButton
                  onClick={() => onClickVariant(variantId, selectionId)}
                  disabled={checkOosOption(variantId, selectionId)}
                  key={selectionId}
                  className={`active:border-primary active:bg-primary active:bg-opacity-5 ${
                    variantMap[variantId] === selectionId
                      ? "border-primary bg-primary bg-opacity-5 text-white"
                      : "border-gray-400"
                  }`}
                >
                  {label}
                </VariantButton>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
