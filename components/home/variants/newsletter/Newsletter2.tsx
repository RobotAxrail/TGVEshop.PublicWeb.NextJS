import useTranslation from 'next-translate/useTranslation';

export default function Newsletter2({ bannerImage }) {
  const { t } = useTranslation('common');
  return (
    <div
      style={{
        backgroundImage: `url('${bannerImage}')`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-black bg-opacity-30 p-14 md:p-22">
        <div className="flex flex-col items-center p-4 gap-10 h-64 justify-center">
          <p
            style={{ font: "normal normal medium 28px/37px Playfair Display" }}
            className="text-xl text-white m-0 text-center font-playFair"
          >
            {t('SUBSCRIBE TO OUR NEWSLETTER')}
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              className="w-full min-w-[80vw] md:min-w-[25vw] border-[2px] border-solid border-white outline-white bg-transparent py-3 px-8 placeholder:text-white text-white"
              placeholder="Enter Your Email"
            />
            <button className="duration-100 text-sm md:text-md bg-white px-2 md:px-12 py-3 rounded-sm w-full md:w-fit text-black hover:brightness-90">
              {t('SUBSCRIBE')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
