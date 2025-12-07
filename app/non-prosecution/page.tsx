import { Suspense } from "react";
import NonProsecutionComponent from "./components/NonProsecutionComponent";

const WithDrawPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading non prosecution complaints...</div>}>
        <NonProsecutionComponent />
      </Suspense>
    </div>
  );
};

export default WithDrawPage;
