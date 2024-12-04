import React, { useEffect } from "react";
// import lottie from "lottie-web/build/player/lottie_light";
// import underMaintenanceData from "@/lottie/under-maintenance.json";
import SEO from "@/components/seo/SEO";

const Maintenance = () => {
  // useEffect(() => {
  //   lottie.loadAnimation({
  //     container: document.querySelector("#maintenance-svg"), // the dom element that will contain the animation
  //     renderer: "svg",
  //     loop: true,
  //     autoplay: true,
  //     animationData: underMaintenanceData, // the path to the animation json
  //   });
  // }, []);

  return (
    <>
      <SEO title="Maintenance" keywords="" description="Maintenance" />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div
          id="maintenance-svg"
          className="h-auto w-auto max-h-[300px] max-w-[300px]"
        />
        <p className="font-bold">Under Maintenance</p>
        <p className="px-4">
          The page you're looking for is currently under maintenance and will be
          back soon.
        </p>
      </div>
    </>
  );
};

export default Maintenance;
