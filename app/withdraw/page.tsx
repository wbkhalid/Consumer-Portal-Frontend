import { Suspense } from "react";
import WithDrawComponent from "./components/WithDrawComponent";

const WithDrawPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading withdraw complaints...</div>}>
        <WithDrawComponent />
      </Suspense>
    </div>
  );
};

export default WithDrawPage;
