import { Suspense } from "react";
import EscalationComponent from "./components/EscalationComponent";

const EscalationPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading escalation complaints...</div>}>
        <EscalationComponent />
      </Suspense>
    </div>
  );
};

export default EscalationPage;
