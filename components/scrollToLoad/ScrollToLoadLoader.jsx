import { LoadingIcon } from "../icons/Icons";

const ScrollToLoadLoader = () => {
  return (
    <div className="flex gap-2">
      <LoadingIcon color="text-primary" width="w-5" height="h-5" />
      <div>loading...</div>
    </div>
  );
};

export default ScrollToLoadLoader;
