import AreachartComponent from "./components/home-page/AreaChartComponent";
import ComplainFieldChart from "./components/home-page/ComplainFieldChart";
import ComplainMap from "./components/home-page/ComplainMap";
import ComplainStatusChart from "./components/home-page/ComplainStatusChart";
import ComplainTypeChart from "./components/home-page/ComplainTypeChart";
import FilterDataComponent from "./components/home-page/FilterDataComponent";
import StatSummary from "./components/home-page/StatSummary";

const page = () => {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-12 lg:col-span-8 xl:col-span-9 min-h-screen">
        <StatSummary />
        <AreachartComponent />
        <div className="grid grid-cols-2 gap-2">
          <ComplainFieldChart />
          <ComplainTypeChart />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4 xl:col-span-3">
        <FilterDataComponent />
        <ComplainStatusChart />
        <ComplainMap />
      </div>
    </div>
  );
};

export default page;
