import { Suspense } from "react";
import SuperEscalationComponent from "./components/SuperEscalationComponent";

const SuperEscalationPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading escalation complaints...</div>}>
        <SuperEscalationComponent />
      </Suspense>
    </div>
  );
};

export default SuperEscalationPage;
