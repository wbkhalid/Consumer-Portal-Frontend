import { Suspense } from "react";
import DecidedonMeritComponent from "./components/DecidedonMeritComponent";

const DecidedonMeritPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading decided on merit complaints...</div>}>
        <DecidedonMeritComponent />
      </Suspense>
    </div>
  );
};

export default DecidedonMeritPage;
