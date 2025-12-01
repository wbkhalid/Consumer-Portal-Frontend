import PendingComponent from "./components/PendingComponent";
import { Suspense } from "react";

const PendingPage = () => {
  return (
    <Suspense fallback={<div>Loading pending complaints...</div>}>
      <PendingComponent />
    </Suspense>
  );
};

export default PendingPage;
