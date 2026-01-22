import React, { Suspense } from "react";
import AppealComponent from "./components/AppealComponent";

const AppealPage = () => {
  return (
    <Suspense fallback={<div>Loading appleas complaints...</div>}>
      <AppealComponent />
    </Suspense>
  );
};

export default AppealPage;
