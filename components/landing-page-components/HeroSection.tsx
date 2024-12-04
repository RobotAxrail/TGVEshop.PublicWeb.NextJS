import { useRouter } from "next/router";
import { FaPlay as PlayIcon } from "react-icons/fa";

export type HeroProps = {
  logo: string;
  image: string;
  title: string;
  description: string;
  primaryLink?: string;
  secondaryLink?: string;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
};

export default function HeroSection({
  logo,
  image,
  title,
  description,
  primaryLink,
  secondaryLink,
  primaryButtonTitle,
  secondaryButtonTitle,
}: HeroProps) {
  const router = useRouter();
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 pt-0 md:pt-10">
            <div className="sm:text-center lg:text-left p-2 md:p-0">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-5xl">
                {title}
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-[16px] sm:max-w-xl sm:text-lg md:mt-[16px] md:text-xl lg:mx-0">
                {description}
              </p>
              <div className="mt-5 sm:mt-[40px] flex flex-row items-center space-x-4 sm:space-x-6 md:justify-center lg:justify-start">
                <div>
                  {primaryLink ? (
                    <button
                      className="flex w-full md:min-w-[200px] md:min-h-[50px] items-center justify-center border border-transparent bg-red-600 px-8 py-3 text-base shadow font-medium text-white hover:bg-red-700 md:py-[10px] md:px-[16px] md:text-[20px] rounded-full no-underline"
                      onClick={() => router.push(primaryLink)}
                    >
                      {primaryButtonTitle ? primaryButtonTitle : "Explore Now"}
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  {secondaryLink ? (
                    <div className="flex flex-row space-x-2 group cursor-pointer items-center">
                      <div className="align-center justify-center flex rounded-full bg-yellow-400 group-hover:bg-yellow-300 h-8 w-8 sm:w-10 sm:h-10 md:w-12 md:h-12 p-2 md:p-3 ring ring-yellow-200">
                        <PlayIcon className="text-red-600 m-auto text-xs md:text-xl" />
                      </div>
                      <div
                        className="flex items-center justify-center rounded-md border border-transparent text-base font-medium group-hover:text-yellow-300 text-yellow-400  md:text-lg no-underline"
                        onClick={() => router.push(secondaryLink)}
                      >
                        {secondaryButtonTitle
                          ? secondaryButtonTitle
                          : "Watch Video"}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 h-full z-10">
        <img
          className="h-auto w-full object-center object-cover sm:h-auto md:h-full lg:h-full lg:w-full"
          src={image}
          alt=""
        />
      </div>
    </div>
  );
}
