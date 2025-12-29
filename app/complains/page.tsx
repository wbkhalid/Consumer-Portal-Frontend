import { Suspense } from "react";
import ComplainComponent from "./components/ComplainComponent";

const ComplainPage = async () => {
  return (
    <div>
      <Suspense fallback={<div>Loading complaints...</div>}>
        <ComplainComponent />
      </Suspense>
    </div>
  );
};

export default ComplainPage;
