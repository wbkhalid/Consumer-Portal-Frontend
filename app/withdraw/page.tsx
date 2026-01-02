import { Suspense } from "react";
import ResolvedComponent from "../components/ResolvedComponent";

const WithDrawPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading withdraw complaints...</div>}>
        <ResolvedComponent title="Withdraw Complaints" status={6} />
      </Suspense>
    </div>
  );
};

export default WithDrawPage;
