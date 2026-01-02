import { Suspense } from "react";
import ResolvedComponent from "../components/ResolvedComponent";

const ExPartePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading ex-parte complaints...</div>}>
        <ResolvedComponent title="Ex-Parte Complaints" status={5} />
      </Suspense>
    </div>
  );
};

export default ExPartePage;
