import { Suspense } from "react";
import ResolvedComponent from "../components/ResolvedComponent";

const WithDrawPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading non prosecution complaints...</div>}>
        <ResolvedComponent title="Non Prosecution Complaints" status={7} />
      </Suspense>
    </div>
  );
};

export default WithDrawPage;
