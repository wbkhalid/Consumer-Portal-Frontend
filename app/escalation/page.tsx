import { Suspense } from "react";
import ProcessingComponent from "../components/ProcessingComponent";

const EscalationPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Escalation Complaints...</div>}>
        <ProcessingComponent title="Escalation Complaints" status={2} />
      </Suspense>
    </div>
  );
};

export default EscalationPage;
