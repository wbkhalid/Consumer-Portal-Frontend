import { Suspense } from "react";
import RedHotComponents from "./components/RedHotComponents";

const RedHotComplaints = () => {
  return (
    <Suspense fallback={<div>Loading Red Hot Complaints...</div>}>
      <RedHotComponents />
    </Suspense>
  );
};

export default RedHotComplaints;
