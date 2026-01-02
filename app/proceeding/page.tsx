import { Suspense } from "react";
import ProcessingComponent from "../components/ProcessingComponent";

const ProceedingPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading proceeding complaints...</div>}>
        <ProcessingComponent title="Proceeding Complaints" status={1} />
      </Suspense>
    </div>
  );
};

export default ProceedingPage;
