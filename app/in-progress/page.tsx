import { Suspense } from "react";
import InProgressComponent from "./components/InProgressComponent";

const InProgressPage = async () => {
  return (
    <Suspense fallback={<div>Loading complaints...</div>}>
      <InProgressComponent />
    </Suspense>
  );
};

export default InProgressPage;
