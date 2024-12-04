export default function ContactUsForm1({
  enquiryErrorMessage,
  emailErrorMessage,
  nameErrorMessage,
  isEnableEnquiry,
  onInputChange,
  checkInput,
  onSubmit,
  classes,
  input,
}: {
  enquiryErrorMessage: any;
  emailErrorMessage: any;
  nameErrorMessage: any;
  isEnableEnquiry: any;
  onInputChange: any;
  checkInput: any;
  onSubmit: any;
  classes: any;
  input: any;
}) {
  return (
    <>
      {isEnableEnquiry && (
        <div className={`${classes.form} ${"my-16 p-8 sm:px-[20%] sm:py-16"}`}>
          <h2 className="text-center font-semibold sm:text-[27px] text-lg">
            Contact Form
          </h2>
          <div>
            <label className="text-sm sm:text-lg">Your name</label>
            <input
              type="text"
              className="w-full"
              value={input.name}
              onChange={onInputChange}
              disabled={onSubmit}
              name="name"
            />
            <p>{nameErrorMessage}</p>
          </div>
          <div>
            <label className="text-sm sm:text-lg">E-mail address</label>
            <input
              type="email"
              className="w-full"
              value={input.email}
              onChange={onInputChange}
              disabled={onSubmit}
              name="email"
            />
            <p>{emailErrorMessage}</p>
          </div>
          <div>
            <label className="text-sm sm:text-lg">Enquiry</label>
            <textarea
              className="w-full"
              value={input.enquiry}
              onChange={onInputChange}
              disabled={onSubmit}
              name="enquiry"
            />
            <p>{enquiryErrorMessage}</p>
          </div>
          <button
            type="submit"
            className="bg-primary text-white font-semibold rounded-[10px] w-1/2 max-w-[100px] py-1.5 px-0 text-sm
          sm:w-auto sm:max-w-full sm:px-9 sm:text-lg disabled:bg-gray-300"
            onClick={checkInput}
            disabled={onSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
}
