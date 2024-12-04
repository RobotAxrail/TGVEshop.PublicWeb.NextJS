export default function StatsSection({
  title = "Trusted by developers from over 80 planets",
  subtitle,
  stats,
}: {
  subtitle?: string;
  title: string;
  stats: { title: string; value: string }[];
}) {
  return (
    <div className="bg-white">
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 text-xl text-gray-500 sm:mt-4">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="mt-10 bg-white pb-12 sm:pb-16">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 " />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto">
                <dl className="sm:grid sm:grid-cols-3">
                  {stats?.map(({ title, value }, index) => (
                    <div
                      className={
                        index < stats.length - 1
                          ? "flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r"
                          : "flex flex-col p-6 text-center"
                      }
                      key={index}
                    >
                      <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                        {title}
                      </dt>
                      <dd className="order-1 text-5xl font-bold tracking-tight text-[#0F8983]">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
