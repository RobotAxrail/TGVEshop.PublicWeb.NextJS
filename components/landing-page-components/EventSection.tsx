import EventCard, { EventCardProps } from "./EventCard";
import React from "react";
import { useRouter } from "next/router";
import useCountdown from "@/hooks/useCountdown";
import dayjs from "dayjs";

export type EventProps = {
  title?: string;
  subtitle?: string;
  seeAllLink?: string;
  events: EventCardProps[];
  limit?: number;
  showCountdown?: boolean;
};

export default function EventSection({
  showCountdown,
  seeAllLink,
  subtitle,
  events,
  title,
  limit,
}: EventProps) {
  const router = useRouter();
  const pE = events
    ?.filter(({ availableDate }) => {
      if (availableDate)
        return dateDiffInDays(new Date(), new Date(availableDate)) > 0;
      return true;
    })
    .sort(
      ({ availableDate: a }, { availableDate: b }) =>
        -dateDiffInDays(new Date(a), new Date(b))
    );
  const firstDate = new Date(pE[0]?.availableDate);
  const [days, hours, minutes, seconds] = useCountdown(firstDate);

  return (
    <div className="relative bg-white p-4 pb-32">
      <div className="relative max-w-full mx-auto">
        <header className="w-fit mx-auto">
          {subtitle && (
            <h3 className="text-xl text-center font-bold text-[#0F8983] m-0">
              {subtitle || "Events"}
            </h3>
          )}
          {title && (
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 m-0">
              {title || "Upcoming Events"}
            </h2>
          )}
        </header>
        {events?.length === 0 && (
          <div className="text-center h-full flex w-full items-center justify-center">
            No items here
          </div>
        )}
        {showCountdown && pE?.length > 0 && (
          <div className="flex items-center flex-col max-w-7xl m-auto pt-[24px]">
            <div className="flex space-y-[24px] flex-col">
              <div className="flex flex-row items-center space-x-1 text-left">
                <div>Count down to the latest event: </div>
                <div className="bg-[#F7CE5C] p-1 rounded-md">
                  {dayjs(firstDate)?.format("D MMM YYYY")}
                </div>
              </div>
              <div className="flex flex-row w-full justify-center space-x-1 md:space-x-4 items-center">
                <div className="bg-[#0F8983] p-2 md:p-4 flex flex-col rounded-md  text-white items-center md:space-y-2 md:min-w-[150px] md:w-auto w-full">
                  <div className="md:text-[36px]">{days}</div>
                  <div>Days</div>
                </div>
                <div className="md:text-[50px] text-[#0F8983]">:</div>
                <div className="bg-[#0F8983] p-2 md:p-4 flex flex-col rounded-md  text-white items-center md:space-y-2 md:min-w-[150px] md:w-auto w-full">
                  <div className="md:text-[36px]">{hours}</div>
                  <div>Hours</div>
                </div>
                <div className="md:text-[50px] text-[#0F8983]">:</div>
                <div className="bg-[#0F8983] p-2 md:p-4 flex flex-col rounded-md  text-white items-center md:space-y-2 md:min-w-[150px] md:w-auto w-full">
                  <div className="md:text-[36px]">{minutes}</div>
                  <div>Minutes</div>
                </div>
                <div className="md:text-[50px] text-[#0F8983]">:</div>
                <div className="bg-[#0F8983] p-2 md:p-4 flex flex-col rounded-md  text-white items-center md:space-y-2 md:min-w-[150px] md:w-auto w-full">
                  <div className="md:text-[36px]">{seconds}</div>
                  <div>Seconds</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 sm:px-16 grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-x-[24px] lg:gap-y-[24px] xl:grid-cols-3 xl:gap-x-4 xl:px-6 max-w-7xl m-auto">
          {pE
            ?.slice(0, limit || events?.length)
            ?.map((event: EventCardProps, index: number) => (
              <EventCard
                subtitle={event.subtitle}
                image={event.image}
                title={event.title}
                lines={event.lines}
                key={index}
              />
            ))}
        </div>
        {seeAllLink && (
          <div className="mt-8 w-fit mx-auto">
            <button
              className="flex md:min-w-[200px] md:min-h-[50px] items-center justify-center border border-transparent bg-red-600 px-8 py-3 text-base shadow font-medium text-white hover:bg-red-700 md:py-[10px] md:px-[16px] md:text-[20px] rounded-full no-underline"
              onClick={() => router.push(seeAllLink)}
            >
              See All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function dateDiffInDays(a: Date, b: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
