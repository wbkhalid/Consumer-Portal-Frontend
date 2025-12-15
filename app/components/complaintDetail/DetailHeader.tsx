import { RxCross2 } from "react-icons/rx";

interface DetailHeaderProp {
  id: string | number;
  name: string;
}

const DetailHeader = () => {
  return (
    <div className="flex justify-between items-center px-5! py-2.5!">
      <div className="flex flex-col">
        <p className="text-[#1D1C1D] font-bold">CMP-2024-001</p>
        <p className="text-[#1D1C1D] text-sm">Khan Electronics & Appliances</p>
      </div>
      <div>
        <div className="flex gap-0.5 items-center border! border-[#E2E8F0]! text-[#606060] rounded-[13px] px-2! py-1.5!">
          <RxCross2 />
          <p className="text-sm"> Close</p>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
