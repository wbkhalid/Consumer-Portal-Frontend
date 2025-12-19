import { Suspense } from "react";
import RedHotComponents from "./components/RedHotComponents";

const RedHotComplaints = () => {
  return (
    <Suspense fallback={<div>Loading REd Hot Complaints complaints...</div>}>
      <RedHotComponents />
    </Suspense>
  );
};

export default RedHotComplaints;
