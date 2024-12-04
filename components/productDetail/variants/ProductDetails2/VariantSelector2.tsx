export default function VariantSelector2({
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
    <div className="flex flex-col gap-1">
      {defaultVariantStructure.length > 0 &&
        defaultVariantStructure.map(({ id, name, selections }) => {
          return (
            <div
              className="border-[1px] border-black p-3 w-full flex flex-row items-center gap-2"
              key={id}
            >
              <p className="m-0 whitespace-nowrap">{`${id} :`}</p>
              <select
                className="w-full p-1 outline-transparent cursor-pointer bg-transparent outline-none"
                onChange={(e) => onClickVariant(id, e.target.value)}
              >
                <option value={null}>{`Select ${id}`}</option>
                {selections?.map(({ id, label }) => (
                  <option value={id} key={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
    </div>
  );
}
