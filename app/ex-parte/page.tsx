import { Suspense } from "react";
import ExParteComponent from "./components/ExParteComponent";

const ExPartePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading ex-parte complaints...</div>}>
        <ExParteComponent />
      </Suspense>
    </div>
  );
};

export default ExPartePage;
