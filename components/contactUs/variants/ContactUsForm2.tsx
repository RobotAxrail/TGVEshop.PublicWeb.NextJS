export default function ContactUsForm2({
  isEnableEnquiry,
  handleFormSubmit,
  onInputChange,
}: {
  handleFormSubmit: Function;
  isEnableEnquiry: boolean;
  onInputChange: Function;
}) {
  async function onSubmit(e: any) {
    e.preventDefault();
    await handleFormSubmit();
    e.target.reset();
  }

  return (
    <>
      {isEnableEnquiry && (
        <div className="relative w-full">
          <div className="bg-primary h-full w-full opacity-30 absolute" />
          <div className="p-2 pt-10 md:p-20 my-5 md:my-10 ">
            <div className="text-center text-2xl font-semibold text-gray-700">
              Contact Us
            </div>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-4 md:gap-12 p-4 ">
                <div className="flex flex-col gap-1 z-10">
                  <label className="mb-1 text-lg text-gray-700">
                    *Your name
                  </label>
                  <input
                    onChange={onInputChange as any}
                    className="outline-transparent border-transparent p-3"
                    name="name"
                    type="text"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 z-10">
                  <label className="mb-1 text-lg text-gray-700">
                    *Email Address
                  </label>
                  <input
                    onChange={onInputChange as any}
                    className="outline-transparent border-transparent p-3"
                    name="email"
                    type="email"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 z-10">
                  <label className="mb-1 text-lg text-gray-700">
                    *Phone Number
                  </label>
                  <input
                    className="outline-transparent border-transparent p-3"
                    name="phone"
                    type="text"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 z-10">
                  <label className="mb-1 text-lg text-gray-700">
                    *Your Message
                  </label>
                  <textarea
                    className="outline-transparent border-transparent p-3"
                    onChange={onInputChange as any}
                    name="enquiry"
                    minLength={10}
                    maxLength={300}
                    required
                    rows={10}
                  ></textarea>
                </div>
                <div className="w-full flex flex-row align-center justify-center z-10">
                  <button
                    className="bg-primary py-3 px-4 rounded w-[100%] md:w-[70%] text-white"
                    type="submit"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
