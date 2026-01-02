import { Suspense } from "react";
import ResolvedComponent from "../components/ResolvedComponent";

const DecidedonMeritPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading decided on merit complaints...</div>}>
        <ResolvedComponent title="Decided on Merit Complaints" status={4} />
      </Suspense>
    </div>
  );
};

export default DecidedonMeritPage;
