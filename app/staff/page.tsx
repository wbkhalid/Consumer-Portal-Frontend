import { Suspense } from "react";
import StaffComponent from "./components/StaffComponent";

const StaffPage = () => {
  return (
    <Suspense fallback={<div>Loading Staff...</div>}>
      <StaffComponent />
    </Suspense>
  );
};

export default StaffPage;
