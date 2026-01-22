import { Suspense } from "react";
import CustomComplaintComponent from "./components/CustomComplaintComponent";

const CustomComplaintPage = async () => {
  return (
    <div>
      <Suspense fallback={<div>Loading custom complaints...</div>}>
        <CustomComplaintComponent />
      </Suspense>
    </div>
  );
};

export default CustomComplaintPage;
