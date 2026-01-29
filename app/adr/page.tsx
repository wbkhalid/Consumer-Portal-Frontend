import { Suspense } from "react";
import ProcessingComponent from "../components/ProcessingComponent";

const ADRPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading ADR complaints...</div>}>
        <ProcessingComponent title="ADR Complaints" status={12} />
      </Suspense>
    </div>
  );
};

export default ADRPage;
