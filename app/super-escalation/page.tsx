import { Suspense } from "react";
import ProcessingComponent from "../components/ProcessingComponent";

const SuperEscalationPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Super Escalation Complaints...</div>}>
        <ProcessingComponent title="Super Escalation Complaints" status={3} />
      </Suspense>
    </div>
  );
};

export default SuperEscalationPage;
