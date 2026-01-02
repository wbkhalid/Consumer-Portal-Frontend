import { Suspense } from "react";
import ComplainComponent from "./components/ComplainComponent";

const ComplainPage = async () => {
  return (
    <Suspense fallback={<div>Loading complaints...</div>}>
      <ComplainComponent />
    </Suspense>
  );
};

export default ComplainPage;
