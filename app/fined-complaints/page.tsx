import { Suspense } from "react";
import FinedComplaintsComponent from "./components/FinedComplaintsComponent";

const FinedComplaintPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading fined complaints...</div>}>
        <FinedComplaintsComponent />
      </Suspense>
    </div>
  );
};

export default FinedComplaintPage;
