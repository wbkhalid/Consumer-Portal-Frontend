import { Suspense } from "react";
import ProcessingComponent from "../components/ProcessingComponent";

const ADRPage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div>Loading Alternate Dispute Resolution (ADR) complaints...</div>
        }
      >
        <ProcessingComponent
          title="Alternate Dispute Resolution (ADR) Complaints"
          status={12}
        />
      </Suspense>
    </div>
  );
};

export default ADRPage;
