import { Suspense } from "react";
import ProceedingComponent from "./components/ProceedingComponent";

const ProceedingPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading proceeding complaints...</div>}>
        <ProceedingComponent />
      </Suspense>
    </div>
  );
};

export default ProceedingPage;
