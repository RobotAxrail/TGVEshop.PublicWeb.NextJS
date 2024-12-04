const GiftCardSetup = ({ register, watch, errors, setValue, currency }: any) => {
  return (
    <div className="flex flex-col lg:m-5 bg-white rounded-xl px-6">
      <h3 className="text-2xl mb-4">Choose gift amount</h3>
      <div className="grid gap-6 mb-6 lg:grid-cols-2">
        <div className="flex flex-col">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Number of gifts
          </label>
          <input
            type="number"
            min="1"
            step="1"
            onKeyDown={(e) => {
              if (["e", "E", "+", "-", "."].includes(e.key)) {
                e.preventDefault();
              }
            }}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              errors?.giftCardQuantity && "focus:border-red-500 border-red-500"
            }
              }`}
            placeholder="1"
            {...register("giftCardQuantity", {
              onChange: (e) => {
                const totalAmount =
                  Number(e.target.value) * watch("giftCardAmount");
                setValue("totalAmount", totalAmount);
                setValue(
                  "giftCardQuantity",
                  Number(e.target.value.replace(/\D/g, ""))
                );
              },
            })}
          />
          {errors?.giftCardQuantity && (
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {errors?.giftCardQuantity?.message}
            </span>
          )}
          <label className="text-[#697586] text-xs">Max: 100</label>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="giftCardAmount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Amount per gift
          </label>
          <select
            {...register("giftCardAmount", {
              onChange: (e) => {
                const totalAmount =
                  Number(e.target.value) * watch("giftCardQuantity");
                setValue("totalAmount", totalAmount);
                setValue("giftCardAmount", Number(e.target.value));
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={10}>{currency} 10</option>
            <option value={20}>{currency} 20</option>
            <option value={30}>{currency} 30</option>
            <option value={50}>{currency} 50</option>
          </select>
        </div>
      </div>

      <h3 className="text-2xl mb-4 ">Customize your gift</h3>
      <div className="grid gap-6 mb-6 lg:grid-cols-2">
        <div className="flex flex-col">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            From
          </label>
          <input
            type="text"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              errors?.senderName && "focus:border-red-500 border-red-500"
            }
            }`}
            placeholder="John"
            required
            {...register("senderName")}
          />
          {errors?.senderName && (
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {errors?.senderName?.message}
            </span>
          )}

          <label className="text-[#697586] text-xs">
            We'll show this on the greeting card
          </label>
        </div>
        <div className="flex flex-col">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Card title
          </label>
          <input
            type="text"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              errors?.giftCardTitle && "focus:border-red-500 border-red-500"
            }
              }`}
            placeholder="John"
            required
            {...register("giftCardTitle")}
            value={watch("giftCardTitle")}
          />
          {errors?.giftCardTitle && (
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {errors?.giftCardTitle?.message}
            </span>
          )}
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            errors?.giftCardMessage && "focus:border-red-500 border-red-500"
          }
            }`}
          placeholder="Your message..."
          {...register("giftCardMessage")}
          value={watch("giftCardMessage")}
        ></textarea>
        {errors?.giftCardMessage && (
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {errors?.giftCardMessage?.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default GiftCardSetup;
