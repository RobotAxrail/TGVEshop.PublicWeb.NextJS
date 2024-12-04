export type EventCardProps = {
  availableDate?: string;
  image: string;
  title: string;
  subtitle: string;
  lines: { leftIcon?: string; text: string }[];
};

export default function EventCard({
  image,
  title,
  subtitle,
  lines,
}: EventCardProps) {
  return (
    <div className="group mx-auto relative flex flex-col overflow-hidden rounded-t-lg border border-gray-200 bg-white w-full">
      <img
        className="h-[140px] sm:h-[280px] w-full object-cover object-center"
        src={image}
        alt=""
      />
      <div className="flex flex-1 flex-col p-4 space-y-2">
        {subtitle && (
          <p className="text-[16px] text-gray-500 m-0">{subtitle}</p>
        )}
        <h3 className="text-[18px] font-bold text-gray-900 m-0">{title}</h3>
        <div className="flex flex-1 flex-col space-y-1">
          {lines.map((line: any, index: number) => (
            <span
              className="text-md text-gray-800 flex flex-row items-center space-x-2"
              key={index}
            >
              {line.leftIcon && (
                <img
                  className="h-[32px] w-[32px] overflow-hidden object-cover"
                  src={line.leftIcon}
                  alt="card-alt"
                />
              )}
              <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                {line.text}
              </div>
            </span>
          ))}
        </div>
      </div>
      <div className="h-2 bg-[#0F8983]"></div>
    </div>
  );
}
