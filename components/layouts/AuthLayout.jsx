import React from "react";
import Alert from "@/components/alert/Alert";

const AuthLayout = ({ title, children, alertMessage, error }) => {
  return (
    <div className="xs:max-w-[400px] p-5 mx-auto">
      <h1 className="text-center">{title}</h1>
      {/* {error && <Alert message={alertMessage} />} */}
      {children}
    </div>
  );
};

export default AuthLayout;
