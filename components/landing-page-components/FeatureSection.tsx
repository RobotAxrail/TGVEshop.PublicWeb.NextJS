import { useRouter } from "next/router";

export type FeatureProps = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  primaryLink?: string;
  primaryButtonTitle?: string;
  alignment?: "left" | "right";
};

export default function FeatureSection({
  image,
  title,
  subtitle,
  description,
  primaryLink,
  primaryButtonTitle,
  alignment = "left",
}: FeatureProps) {
  const router = useRouter();

  return (
    <section className="grid grid-cols-7 gap-10">
      {alignment === "left" && (
        <div className="col-span-7 lg:col-span-3 hidden lg:block">
          <img
            alt="Customer profile user interface"
            className={""}
            src={image}
          />
        </div>
      )}
      <div className="col-span-7 lg:col-span-4  w-full">
        <div className={"px-6 lg:px-12 max-w-3xl lg:col-span-3 lg:py-32"}>
          <div>
            {subtitle && (
              <div>
                <h3 className="text-xl font-bold text-[#0F8983] m-0">
                  {subtitle}
                </h3>
              </div>
            )}
            <div className="mt-[8px]">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 m-0">
                {title}
              </h2>
              <div
                className="mt-[32px] text-lg text-gray-500"
                dangerouslySetInnerHTML={{ __html: description }}
              />

              <div className="mt-[32px]">
                {primaryLink ? (
                  <button
                    className="flex md:min-w-[200px] md:min-h-[50px] items-center justify-center border border-transparent bg-red-600 px-8 py-3 text-base shadow font-medium text-white hover:bg-red-700 md:py-[10px] md:px-[16px] md:text-[20px] rounded-full no-underline"
                    onClick={() => router?.push(primaryLink)}
                  >
                    {primaryButtonTitle || "Get Started"}
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-7 lg:col-span-3 lg:hidden block">
        <img alt="Customer profile user interface" className={""} src={image} />
      </div>
      {alignment === "right" && (
        <div className="col-span-7 lg:col-span-3 hidden lg:block">
          <img
            alt="Customer profile user interface"
            className={""}
            src={image}
          />
        </div>
      )}
    </section>
  );
}
