import { Suspense } from "react";
import TotalResolvedComponent from "./components/TotalResolvedComponent";

const TotalResolvedPage = async () => {
  return (
    <Suspense fallback={<div>Loading complaints...</div>}>
      <TotalResolvedComponent />
    </Suspense>
  );
};

export default TotalResolvedPage;
