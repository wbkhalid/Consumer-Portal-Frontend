import { Suspense } from "react";
import ProcessingComponent from "../components/ProcessingComponent";

const RemandPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading remanded complaints...</div>}>
        <ProcessingComponent title="Remanded Complaints" status={13} />
      </Suspense>
    </div>
  );
};

export default RemandPage;
