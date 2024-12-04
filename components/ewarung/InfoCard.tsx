import React from "react";

interface IInfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  topRightComponent?: React.ReactNode;
  children: React.ReactNode;
}

const InfoCard: React.FC<IInfoCardProps> = ({
  title,
  topRightComponent,
  children,
  //tailwind class to overwrite the card styling
  ...rest
}) => {
  return (
    <div {...rest} className={`card bg-base-100 shadow-md ${rest.className}`}>
      <div
        className={`card-body ${title || topRightComponent ? "p-5" : "p-0"}`}
      >
        {(title || topRightComponent) && (
          <div className="flex justify-between">
            {title && (
              <h3 className="card-title text-base m-0 text-primary font-semibold">
                {title}
              </h3>
            )}
            {topRightComponent && <>{topRightComponent}</>}
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default InfoCard;
