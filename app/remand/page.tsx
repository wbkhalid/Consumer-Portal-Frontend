import { Suspense } from "react";
import ProcessingComponent from "../components/ProcessingComponent";

const RemandPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading remand complaints...</div>}>
        <ProcessingComponent title="Remand Complaints" status={1} />
      </Suspense>
    </div>
  );
};

export default RemandPage;
