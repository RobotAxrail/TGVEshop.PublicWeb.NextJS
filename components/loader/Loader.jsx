// components
import { LoadingIcon } from "@/components/icons/Icons";

export const Loader = (props) => {
  const { divHeight = "h-[600px]", position="justify-center items-center" } = props;
  return (
    // <div className="h-screen flex justify-center items-center">
    //   <LoadingIcon className="w-10 h-10 text-primary" />
    // </div>
    <div className={`flex ${position} ${divHeight}`}>
      <LoadingIcon color="text-primary" width="w-7" height="h-7" />
    </div>
  );
};
